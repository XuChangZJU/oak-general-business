import { GeneralRuntimeContext } from '../RuntimeContext';
import { EntityDict } from 'oak-app-domain';
import assert from 'assert';
import { WechatMpConfig } from 'oak-app-domain/Application/Schema';
import WechatSDK from 'oak-wechat-sdk';
import { CreateOperationData as CreateToken, WechatMpEnv } from 'oak-app-domain/Token/Schema';
import { CreateOperationData as CreateWechatUser } from 'oak-app-domain/WechatUser/Schema';
import { CreateOperationData as CreateUser } from 'oak-app-domain/User/Schema';
import { assign } from 'lodash';
import { SelectRowShape } from 'oak-domain/lib/types';

export async function loginMp<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(params: { code: string }, context: Cxt): Promise<string> {
    const { rowStore } = context;
    throw new Error('method not implemented!');
}

export async function loginByPassword<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(params: { password: string, mobile: string }, context: Cxt): Promise<string> {
    const { rowStore } = context;

    const { result: [mobile] } = await rowStore.select('mobile', {
        data: {
            id: 1,
            mobile: 1,
            userId: 1,
        },
    }, context);

    throw new Error('method not implemented!');
}

export async function loginWechatMp<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>({ code, env }: {
    code: string;
    env: WechatMpEnv;
}, context: Cxt): Promise<string> {
    const { rowStore } = context;
    const application = await context.getApplication();
    const { type, config } = application;

    assert(type === 'wechatMp' || config.type === 'wechatMp');
    const config2 = config as WechatMpConfig;
    const { appId, appSecret } = config2;
    const wechatInstance = WechatSDK.getInstance(appId, appSecret, 'wechatMp');

    const { sessionKey, openId, unionId } = await wechatInstance.code2Session(code);

    const { result: [wechatUser] } = await rowStore.select('wechatUser', {
        data: {
            id: 1,
            userId: 1,
            unionId: 1,
        },
        filter: {
            applicationId: application.id,
            openId,
        }
    }, context);

    const id = await generateNewId();
    if (wechatUser) {
        const wechatUser2 = wechatUser as SelectRowShape<EntityDict['wechatUser']['Schema'], {
            id: 1,
            userId: 1,
            unionId: 1,
        }>;

        const wechatUserUpdateData = {
            sessionKey,
        };
        if (unionId !== wechatUser.unionId as any) {
            assign(wechatUserUpdateData, {
                unionId,
            });
        }
        if (wechatUser2.userId) {
            await rowStore.operate('token', {
                action: 'disable',
                data: {
                },
                filter: {
                    applicationId: application.id,
                    ableState: 'enabled',
                    userId: wechatUser2.userId,
                    playerId: wechatUser2.userId,
                },
            }, context);
        }
        else {
            // 创建user
            assign(wechatUserUpdateData, {
                user: {
                    action: 'create',
                    data: {
                        id: await generateNewId(),
                        name: '',
                        nickname: ''
                    },
                },
            });

            await rowStore.operate('token', {
                action: 'create',
                data: {
                    id,
                    userId: wechatUser2.userId as string,
                    playerId: wechatUser2.userId as string,
                    applicationId: application.id,
                    entity: 'wechatUser',
                    entityId: wechatUser2.id as string,
                    wechatUser: {
                        action: 'update',
                        data: wechatUserUpdateData,
                    },
                    env
                } as CreateToken
            }, context);
        }
        return id;

    }
    else if (unionId) {
        // 如果有unionId，查找同一个system下有没有相同的unionId
        const { result: [wechatUser2] } = await rowStore.select('wechatUser', {
            data: {
                id: 1,
                userId: 1,
                unionId: 1,
            },
            filter: {
                application: {
                    systemId: application.systemId,
                },
                unionId,
            }
        }, context);
        if (wechatUser2 && wechatUser2.userId) {
            await rowStore.operate('token', {
                action: 'disable',
                data: {
                },
                filter: {
                    applicationId: application.id,
                    ableState: 'enabled',
                    userId: wechatUser2.userId,
                    playerId: wechatUser2.userId,
                },
            }, context);

            const wechatUserCreateData: CreateWechatUser = {
                id: await generateNewId(),
                sessionKey,
                unionId,
                origin: 'mp',
                openId,
                applicationId: application.id,
                userId: wechatUser2.userId,
            };
            await rowStore.operate('token', {
                action: 'create',
                data: {
                    id,
                    userId: wechatUser2.userId,
                    playerId: wechatUser2.userId,
                    applicationId: application.id,
                    wechatUser: {
                        action: 'create',
                        data: wechatUserCreateData,
                    },
                    env,
                }
            }, context);
            return id;
        }
    }

    // 到这里都是要同时创建wechatUser和user对象了
    const userData : CreateUser = {
        id: await generateNewId(),
    };
    const wechatUserCreateData: CreateWechatUser = {
        id: await generateNewId(),
        sessionKey,
        unionId,
        origin: 'mp',
        openId,
        applicationId: application.id,
        user: {
            action: 'create',
            data: userData,
        }
    };
    await rowStore.operate('token', {
        action: 'create',
        data: {
            id,
            userId: userData.id,
            playerId: userData.id,
            applicationId: application.id,
            wechatUser: {
                action: 'create',
                data: wechatUserCreateData,
            },
            env,
        }
    }, context);

    return id;
}

/* export type AspectDict<ED extends EntityDict> = {
    loginMp: (params: { code: string }, context: GeneralRuntimeContext<ED>) => Promise<string>;
    loginByPassword: (params: { password: string, mobile: string }, context: GeneralRuntimeContext<ED>) => Promise<string>;
};
 */