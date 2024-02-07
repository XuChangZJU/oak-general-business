"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPassword = exports.getChangePasswordChannels = exports.mergeUser = void 0;
const tslib_1 = require("tslib");
const types_1 = require("oak-domain/lib/types");
const uuid_1 = require("oak-domain/lib/utils/uuid");
const password_1 = require("../utils/password");
const assert_1 = require("oak-domain/lib/utils/assert");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
async function mergeUser(params, context, innerLogic) {
    const { from, to, mergeMobile, mergeEmail, mergeWechatUser } = params;
    if (!innerLogic && !context.isRoot()) {
        throw new types_1.OakUserUnpermittedException('user', { id: 'merge', action: 'merge', data: {}, filter: { id: from } }, '不允许执行mergeUser操作');
    }
    (0, assert_1.assert)(from);
    (0, assert_1.assert)(to);
    (0, assert_1.assert)(from !== to, '不能merge到相同user');
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
                } as any, { dontCollect: true });
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
                } as any, { dontCollect: true });
            }
        }
    } */
    await context.operate('token', {
        id: await (0, uuid_1.generateNewIdAsync)(),
        action: 'disable',
        data: {},
        filter: {
            ableState: 'enabled',
            playerId: from, // todo 这里是playerId, root如果正在扮演该用户待处理
        },
    }, { dontCollect: true });
    await context.operate('user', {
        id: await (0, uuid_1.generateNewIdAsync)(),
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
    if (mergeEmail) {
        await context.operate('email', {
            id: await (0, uuid_1.generateNewIdAsync)(),
            action: 'update',
            data: {
                userId: to,
            },
            filter: {
                userId: from,
            }
        }, { dontCollect: true });
    }
    if (mergeMobile) {
        await context.operate('mobile', {
            id: await (0, uuid_1.generateNewIdAsync)(),
            action: 'update',
            data: {
                userId: to,
            },
            filter: {
                userId: from,
            }
        }, { dontCollect: true });
    }
    if (mergeWechatUser) {
        await context.operate('wechatUser', {
            id: await (0, uuid_1.generateNewIdAsync)(),
            action: 'update',
            data: {
                userId: to,
            },
            filter: {
                userId: from,
            }
        }, { dontCollect: true });
    }
}
exports.mergeUser = mergeUser;
async function getChangePasswordChannels(params, context, innerLogic) {
    const { userId } = params;
    const mobileList = await context.select('mobile', {
        data: {
            id: 1,
            mobile: 1,
            userId: 1,
        },
        filter: {
            userId,
            ableState: 'enabled',
        },
    }, {
        dontCollect: true,
    });
    const [user] = await context.select('user', {
        data: {
            id: 1,
            password: 1,
        },
        filter: {
            id: userId,
        }
    }, {
        dontCollect: true
    });
    const result = [];
    if (mobileList.length > 0) {
        result.push('mobile');
    }
    if (user.password) {
        result.push('password');
    }
    return result;
}
exports.getChangePasswordChannels = getChangePasswordChannels;
async function updateUserPassword(params, context, innerLogic) {
    const { userId, prevPassword, captcha, mobile, newPassword } = params;
    const closeRootMode = context.openRootMode();
    try {
        const [user] = await context.select('user', {
            data: {
                id: 1,
                password: 1,
            },
            filter: {
                id: userId,
            },
        }, {
            dontCollect: true
        });
        if (prevPassword) {
            const [lastSuccessfulTemp] = await context.select('changePasswordTemp', {
                data: {
                    id: 1,
                    $$seq$$: 1,
                },
                filter: {
                    userId,
                    $$createAt$$: {
                        $gt: (0, dayjs_1.default)().startOf('day').valueOf(),
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
            }, {
                dontCollect: true,
            });
            const count1 = await context.count('changePasswordTemp', {
                filter: lastSuccessfulTemp
                    ? {
                        userId,
                        $$seq$$: {
                            $gt: lastSuccessfulTemp.$$seq$$,
                        },
                        result: 'fail',
                    }
                    : {
                        userId,
                        $$createAt$$: {
                            $gt: (0, dayjs_1.default)().startOf('day').valueOf(),
                        },
                        result: 'fail',
                    },
            }, {
                dontCollect: true,
            });
            if (count1 >= 5) {
                closeRootMode();
                return {
                    result: '您今天已尝试过太多次，请稍候再进行操作',
                    times: count1,
                };
            }
            if (user.password === prevPassword) {
                await context.operate('user', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'update',
                    data: {
                        password: newPassword,
                        passwordSha1: (0, password_1.encryptPasswordSha1)(newPassword),
                    },
                    filter: {
                        id: userId,
                    },
                }, {
                    dontCollect: true,
                });
                await context.operate('changePasswordTemp', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'create',
                    data: {
                        id: await (0, uuid_1.generateNewIdAsync)(),
                        userId,
                        prevPassword,
                        newPassword,
                        result: 'success',
                    },
                }, {
                    dontCollect: true,
                });
                closeRootMode();
                return {
                    result: 'success'
                };
            }
            else {
                await context.operate('changePasswordTemp', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'create',
                    data: {
                        id: await (0, uuid_1.generateNewIdAsync)(),
                        userId,
                        prevPassword,
                        newPassword,
                        result: 'fail',
                    },
                }, {
                    dontCollect: true,
                });
                closeRootMode();
                return {
                    result: '原密码不正确，请检查后输入',
                    times: count1,
                };
            }
        }
        if (mobile && captcha) {
            const [aliveCaptcha] = await context.select('captcha', {
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
            }, {
                dontCollect: true,
            });
            if (aliveCaptcha) {
                await context.operate('user', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'update',
                    data: {
                        password: newPassword,
                        passwordSha1: (0, password_1.encryptPasswordSha1)(newPassword),
                    },
                    filter: {
                        id: userId,
                    },
                }, {
                    dontCollect: true,
                });
                await context.operate('changePasswordTemp', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'create',
                    data: {
                        id: await (0, uuid_1.generateNewIdAsync)(),
                        userId,
                        prevPassword: user.password,
                        newPassword,
                        result: 'success',
                    },
                }, {
                    dontCollect: true,
                });
                closeRootMode();
                return {
                    result: 'success'
                };
            }
            else {
                closeRootMode();
                return {
                    result: '验证码错误',
                };
            }
        }
        closeRootMode();
        return {
            result: '缺少原密码或验证码，请检查后再进行操作'
        };
    }
    catch (err) {
        closeRootMode();
        throw err;
    }
}
exports.updateUserPassword = updateUserPassword;
