import { OakUserUnpermittedException } from "oak-domain/lib/types";
import { generateNewIdAsync } from "oak-domain/lib/utils/uuid";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { EntityDict } from "../oak-app-domain";
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { uniq } from 'oak-domain/lib/utils/lodash';
import { encryptPasswordSha1 } from '../utils/password';
import assert from 'assert';
import dayjs from 'dayjs';

export async function mergeUser<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>>(params: { from: string, to: string }, context: Cxt, innerLogic?: boolean) {
    if (!innerLogic && !context.isRoot()) {
        throw new OakUserUnpermittedException('不允许执行mergeUser操作');
    }
    const { from, to } = params;
    assert(from);
    assert(to);
    assert(from !== to, '不能merge到相同user');
    const schema = context.getSchema();
    /* for (const entity in schema) {
        if (['oper', 'modi', 'operEntity', 'modiEntity', 'userEntityGrant', 'wechatQrCode'].includes(entity)) {
            continue;
        }

        const entityDesc = schema[entity];
        if (entityDesc.view) {
            continue;
        }
        const { attributes } = entityDesc;
        for (const attr in attributes) {
            const attrDef = attributes[attr as keyof typeof attributes];
            if (attrDef.type === 'ref' && attrDef.ref === 'user') {
                await context.operate(entity, {
                    action: 'update',
                    data: {
                        [attr]: to,
                    },
                    filter: {
                        [attr]: from,
                    }
                } as any, { dontCollect: true, dontCreateOper: true, dontCreateModi: true });
            }
            if (attr === 'entity' && attributes.hasOwnProperty('entityId')) {
                await context.operate(entity, {
                    action: 'update',
                    data: {
                        entityId: to,
                    },
                    filter: {
                        entity: 'user',
                        entityId: from,
                    }
                } as any, { dontCollect: true, dontCreateOper: true, dontCreateModi: true });
            }
        }
    } */

    await context.operate('token', {
        id: await generateNewIdAsync(),
        action: 'disable',
        data: {},
        filter: {
            ableState: 'enabled',
            playerId: from,         // todo 这里是playerId, root如果正在扮演该用户待处理
        },
    }, { dontCollect: true });

    await context.operate('user', {
        id: await generateNewIdAsync(),
        action: 'merge',
        data: {
            refId: to,
            userState: 'merged',
        },
        filter: {
            $or: [
                {
                    id: from,
                },
                {
                    userState: 'merged',
                    refId: from,
                }
            ],
        },
    }, {});
}

export async function getChangePasswordChannels<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>>(params: { userId: string }, context: Cxt, innerLogic?: boolean) {
    const { userId } = params;
    const mobileList = await context.select(
        'mobile',
        {
            data: {
                id: 1,
                mobile: 1,
                userId: 1,
            },
            filter: {
                userId,
                ableState: 'enabled',
            },
        },
        {}
    );
    const [user] = await context.select(
        'user',
        {
            data: {
                id: 1,
                password: 1,
            },
            filter: {
                id: userId,
            }
        },
        {}
    )
    const result = [];
    if (mobileList.length > 0) {
        result.push('mobile')
    }
    if (user.password) {
        result.push('password')
    }
    return result;
}

export async function updateUserPassword<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>>(params: { userId: string, prevPassword?: string, captcha?: string, newPassword: string, mobile?: string }, context: Cxt, innerLogic?: boolean) {
    const { userId, prevPassword, captcha, mobile, newPassword } = params;
    const [user] = await context.select(
        'user',
        {
            data: {
                id: 1,
                password: 1,
            }
        },
        {}
    )
    if (prevPassword) {
        const [lastSuccessfulTemp] = await context.select(
            'changePasswordTemp',
            {
                data: {
                    id: 1,
                    $$seq$$: 1,
                },
                filter: {
                    userId,
                    $$createAt$$: {
                        $gt: dayjs().startOf('day').valueOf(),
                    },
                    result: 'success',
                },
                sorter: [
                    {
                        $attr: {
                            $$seq$$: 1,
                        },
                        $direction: 'desc',
                    },
                ],
                indexFrom: 0,
                count: 1,
            },
            {}
        )
        const count1 = await context.count(
            'changePasswordTemp',
            {
                filter: lastSuccessfulTemp ? {
                    userId,
                    $$seq$$: {
                        $gt: lastSuccessfulTemp.$$seq$$!,
                    },
                    result: 'fail',
                } : {
                    userId,
                    $$createAt$$: {
                        $gt: dayjs().startOf('day').valueOf(),
                    },
                    result: 'fail',
                },
            },
            {
            }
        )
        if (count1 >= 5) {
            return {
                result: '您今天已尝试过太多次，请稍候再进行操作',
                times: count1,
            }
        }

        if (user.password === prevPassword) {
            await context.operate(
                'user',
                {
                    id: await generateNewIdAsync(),
                    action: 'update',
                    data: {
                        password: newPassword,
                        passwordSha1: encryptPasswordSha1(newPassword)
                    },
                    filter: {
                        id: userId,
                    },
                },
                {}
            );
            await context.operate(
                'changePasswordTemp',
                {
                    id: await generateNewIdAsync(),
                    action: 'create',
                    data: {
                        id: await generateNewIdAsync(),
                        userId,
                        prevPassword,
                        newPassword,
                        result: 'success',
                    },
                },
                {}
            );
            return {
                result: 'success'
            };
        } else {
            await context.operate(
                'changePasswordTemp',
                {
                    id: await generateNewIdAsync(),
                    action: 'create',
                    data: {
                        id: await generateNewIdAsync(),
                        userId,
                        prevPassword,
                        newPassword,
                        result: 'fail',
                    },
                },
                {}
            );
            return {
                result: '原密码不正确，请检查后输入',
                times: count1,
            };
        }
    }
    if (mobile && captcha) {
        const [aliveCaptcha] = await context.select(
            'captcha',
            {
                data: {
                    id: 1,
                },
                filter: {
                    mobile,
                    code: captcha,
                    expired: false,
                },
                indexFrom: 0,
                count: 1,
            },
            {}
        );
        if (aliveCaptcha) {
            await context.operate(
                'user',
                {
                    id: await generateNewIdAsync(),
                    action: 'update',
                    data: {
                        password: newPassword,
                        passwordSha1: encryptPasswordSha1(newPassword)
                    },
                    filter: {
                        id: userId,
                    },
                },
                {}
            );
            await context.operate(
                'changePasswordTemp',
                {
                    id: await generateNewIdAsync(),
                    action: 'create',
                    data: {
                        id: await generateNewIdAsync(),
                        userId,
                        prevPassword: user.password,
                        newPassword,
                        result: 'success',
                    },
                },
                {}
            );
            return {
                result: 'success'
            };
        } else {
            return {
                result: '验证码错误',
            }
        }
    }
    return {
        result: '缺少原密码或验证码，请检查后再进行操作'
    }
}
