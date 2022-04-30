"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWechatMp = exports.loginByPassword = exports.loginMp = void 0;
const assert_1 = __importDefault(require("assert"));
const oak_wechat_sdk_1 = __importDefault(require("oak-wechat-sdk"));
const lodash_1 = require("lodash");
async function loginMp(params, context) {
    const { rowStore } = context;
    throw new Error('method not implemented!');
}
exports.loginMp = loginMp;
async function loginByPassword(params, context) {
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
exports.loginByPassword = loginByPassword;
async function loginWechatMp({ code, env }, context) {
    const { rowStore } = context;
    const application = await context.getApplication();
    const { type, config } = application;
    (0, assert_1.default)(type === 'wechatMp' || config.type === 'wechatMp');
    const config2 = config;
    const { appId, appSecret } = config2;
    const wechatInstance = oak_wechat_sdk_1.default.getInstance(appId, appSecret, 'wechatMp');
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
        const wechatUser2 = wechatUser;
        const wechatUserUpdateData = {
            sessionKey,
        };
        if (unionId !== wechatUser.unionId) {
            (0, lodash_1.assign)(wechatUserUpdateData, {
                unionId,
            });
        }
        if (wechatUser2.userId) {
            // 若用户没有更换任何环境，则重用原来的token，避免token表增长过快
            const { result: [token] } = await rowStore.select('token', {
                data: {
                    id: 1,
                    applicationId: 1,
                    env: 1,
                },
                filter: {
                    applicationId: application.id,
                    ableState: 'enabled',
                    userId: wechatUser2.userId,
                    playerId: wechatUser2.userId,
                    entity: 'wechatUser',
                    entityId: wechatUser2.id,
                },
            }, context);
            if (token && (0, lodash_1.eq)(token.env, env)) {
                await rowStore.operate('token', {
                    action: 'update',
                    data: {
                        wechatUser: {
                            action: 'update',
                            data: wechatUserUpdateData,
                        }
                    },
                    filter: {
                        id: token.id,
                    },
                }, context);
                return token.id;
            }
            await rowStore.operate('token', {
                action: 'disable',
                data: {},
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
            (0, lodash_1.assign)(wechatUserUpdateData, {
                user: {
                    action: 'create',
                    data: {
                        id: await generateNewId(),
                        name: '',
                        nickname: ''
                    },
                },
            });
        }
        await rowStore.operate('token', {
            action: 'create',
            data: {
                id,
                userId: wechatUser2.userId,
                playerId: wechatUser2.userId,
                applicationId: application.id,
                entity: 'wechatUser',
                entityId: wechatUser2.id,
                wechatUser: {
                    action: 'update',
                    data: wechatUserUpdateData,
                },
                env
            }
        }, context);
        return id;
    }
    else if (unionId) {
        // 如果有unionId，查找同一个system下有没有相同的unionId
        const { result: [wechatUser3] } = await rowStore.select('wechatUser', {
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
        const wechatUser2 = wechatUser3;
        if (wechatUser2 && wechatUser2.userId) {
            await rowStore.operate('token', {
                action: 'disable',
                data: {},
                filter: {
                    applicationId: application.id,
                    ableState: 'enabled',
                    userId: wechatUser2.userId,
                    playerId: wechatUser2.userId,
                },
            }, context);
            const wechatUserCreateData = {
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
    const userData = {
        id: await generateNewId(),
    };
    const wechatUserCreateData = {
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
exports.loginWechatMp = loginWechatMp;
/* export type AspectDict<ED extends EntityDict> = {
    loginMp: (params: { code: string }, context: GeneralRuntimeContext<ED>) => Promise<string>;
    loginByPassword: (params: { password: string, mobile: string }, context: GeneralRuntimeContext<ED>) => Promise<string>;
};
 */ 
