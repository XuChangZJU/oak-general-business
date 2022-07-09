"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCaptcha = exports.syncUserInfoWechatMp = exports.loginWechatMp = exports.loginByMobile = exports.loginMp = void 0;
const oak_external_sdk_1 = require("oak-external-sdk");
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const types_1 = require("oak-domain/lib/types");
const extraFile_1 = require("../utils/extraFile");
const Exceptions_1 = require("../types/Exceptions");
async function loginMp(params, context) {
    const { rowStore } = context;
    throw new Error('method not implemented!');
}
exports.loginMp = loginMp;
async function setupMobile(mobile, env, context) {
    const { rowStore } = context;
    const currentToken = await context.getToken();
    const applicationId = context.getApplicationId();
    const { result: result2 } = await rowStore.select('mobile', {
        data: {
            id: 1,
            mobile: 1,
            userId: 1,
            ableState: 1,
            user: {
                id: 1,
                userState: 1,
                wechatUser$user: {
                    $entity: 'wechatUser',
                    data: {
                        id: 1,
                    },
                },
            },
        },
        filter: {
            mobile,
            ableState: 'enabled',
        }
    }, context, { notCollect: true });
    if (result2.length > 0) {
        // 此手机号已经存在
        (0, assert_1.default)(result2.length === 1);
        const [mobileRow] = result2;
        if (currentToken) {
            if (currentToken.userId === mobileRow.userId) {
                return currentToken.id;
            }
            else {
                // 此时可能要合并用户，如果用户有wechatUser信息，则抛出OakDistinguishUserByWechatUser异常，否则抛出
                const { user } = mobileRow;
                const { wechatUser$user } = user;
                if (wechatUser$user.length > 0) {
                    throw new Exceptions_1.OakDistinguishUserByWechatUserException(mobileRow.userId);
                }
                else {
                    throw new Exceptions_1.OakDistinguishUserByBusinessException(mobileRow.userId);
                }
            }
        }
        else {
            // 此时以该手机号登录 todo根据环境来判断，用户也有可能是新获得此手机号，未来再进一步处理
            const tokenData = {
                id: await generateNewId(),
                applicationId,
                playerId: mobileRow.userId,
                env,
            };
            const { user } = mobileRow;
            const { userState } = user;
            switch (userState) {
                case 'disabled': {
                    throw new Exceptions_1.OakUserDisabledException();
                }
                case 'shadow': {
                    (0, lodash_1.assign)(tokenData, {
                        userId: mobileRow.userId,
                        user: {
                            action: 'activate',
                        }
                    });
                    break;
                }
                default: {
                    (0, assert_1.default)(userState === 'normal');
                    (0, lodash_1.assign)(tokenData, {
                        userId: mobileRow.id,
                    });
                }
            }
            await rowStore.operate('token', {
                data: tokenData,
                action: 'create',
            }, context);
            return tokenData.id;
        }
    }
    else {
        //此手机号不存在
        if (currentToken) {
            // 创建手机号并与之关联即可
            const mobileData = {
                id: await generateNewId(),
                mobile,
                userId: currentToken.userId,
            };
            await rowStore.operate('mobile', {
                action: 'create',
                data: mobileData
            }, context);
            return currentToken.id;
        }
        else {
            // 创建token, mobile, user
            const userData = {
                id: await generateNewId(),
                userState: 'normal',
            };
            await rowStore.operate('user', {
                action: 'create',
                data: userData,
            }, context);
            const tokenData = {
                id: await generateNewId(),
                userId: userData.id,
                playerId: userData.id,
                env,
                mobile: {
                    action: 'create',
                    data: {
                        id: await generateNewId(),
                        mobile,
                        userId: userData.id,
                    }
                }
            };
            await rowStore.operate('token', {
                action: 'create',
                data: tokenData,
            }, context);
            return tokenData.id;
        }
    }
}
async function loginByMobile(params, context) {
    const { mobile, captcha, password, env } = params;
    const { rowStore } = context;
    if (captcha) {
        const { result } = await rowStore.select('captcha', {
            data: {
                id: 1,
                expired: 1,
            },
            filter: {
                mobile,
                code: captcha,
            },
            sorter: [{
                    $attr: {
                        $$createAt$$: 1,
                    },
                    $direction: 'desc',
                }],
            indexFrom: 0,
            count: 1,
        }, context, { notCollect: true });
        if (result.length > 0) {
            const [captchaRow] = result;
            if (captchaRow.expired) {
                throw new types_1.OakUserException('验证码已经过期');
            }
            // 到这里说明验证码已经通过
            return await setupMobile(mobile, env, context);
        }
        else {
            throw new types_1.OakUserException('验证码无效');
        }
    }
    else {
        (0, assert_1.default)(password);
        throw new Error('method not implemented!');
    }
}
exports.loginByMobile = loginByMobile;
async function loginWechatMp({ code, env }, context) {
    const { rowStore } = context;
    const application = (await context.getApplication());
    const { type, config } = application;
    (0, assert_1.default)(type === 'wechatMp' || config.type === 'wechatMp');
    const config2 = config;
    const { appId, appSecret } = config2;
    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, appSecret, 'wechatMp');
    const { sessionKey, openId, unionId } = await wechatInstance.code2Session(code);
    const { result: [wechatUser] } = await rowStore.select('wechatUser', {
        data: {
            id: 1,
            userId: 1,
            unionId: 1,
            user: {
                id: 1,
                name: 1,
                nickname: 1,
                userRole$user: {
                    $entity: 'userRole',
                    data: {
                        id: 1,
                        userId: 1,
                        roleId: 1,
                    },
                }
            }
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
                hint: {
                    ignoreTrigger: true,
                },
            }, context);
            if (token && (0, lodash_1.isEqual)(token.env, env)) {
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
                        userState: 'normal',
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
        userState: 'normal',
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
/**
 * 同步从wx.getUserProfile拿到的用户信息
 * @param param0
 * @param context
 */
async function syncUserInfoWechatMp({ nickname, avatarUrl, encryptedData, iv, signature }, context) {
    const { rowStore } = context;
    const { userId } = (await context.getToken());
    const application = (await context.getApplication());
    const { result: [{ sessionKey, user }] } = await rowStore.select('wechatUser', {
        data: {
            id: 1,
            sessionKey: 1,
            nickname: 1,
            avatar: 1,
            user: {
                id: 1,
                nickname: 1,
                extraFile$entity: {
                    $entity: 'extraFile',
                    data: {
                        id: 1,
                        tag1: 1,
                        origin: 1,
                        bucket: 1,
                        objectId: 1,
                        filename: 1,
                        extra1: 1,
                    },
                    filter: {
                        tag1: 'avatar',
                    },
                }
            }
        },
        filter: {
            userId: userId,
            applicationId: application.id,
        }
    }, context);
    // console.log(avatarUrl);
    // const { type, config } = application;
    // assert(type === 'wechatMp' || config.type === 'wechatMp');
    // const config2 = config as WechatMpConfig;
    // const { appId, appSecret } = config2;
    // const wechatInstance = WechatSDK.getInstance(appId, appSecret, 'wechatMp');
    // const result = wechatInstance.decryptData(sessionKey as string, encryptedData, iv, signature);
    // 实测发现解密出来的和userInfo完全一致……
    // console.log(result);
    const { nickname: originNickname, extraFile$entity } = user;
    const updateData = {};
    if (nickname !== originNickname) {
        Object.assign(updateData, {
            nickname,
        });
    }
    if (extraFile$entity?.length === 0 || (0, extraFile_1.composeFileUrl)(extraFile$entity[0]) !== avatarUrl) {
        // 需要更新新的avatar extra file
        const extraFileOperations = [
            {
                action: 'create',
                data: (0, lodash_1.assign)({
                    id: await generateNewId(),
                    tag1: 'avatar',
                    entity: 'user',
                    entityId: userId,
                }, (0, extraFile_1.decomposeFileUrl)(avatarUrl))
            }
        ];
        if (extraFile$entity.length > 0) {
            extraFileOperations.push({
                action: 'remove',
                data: {},
                filter: {
                    id: extraFile$entity[0].id,
                }
            });
        }
        (0, lodash_1.assign)(updateData, {
            extraFile$entity: extraFileOperations,
        });
    }
    if ((0, lodash_1.keys)(updateData).length > 0) {
        await rowStore.operate('user', {
            action: 'update',
            data: updateData,
            filter: {
                id: userId,
            }
        }, context);
    }
    // todo update nickname/avatar in wechatUser
}
exports.syncUserInfoWechatMp = syncUserInfoWechatMp;
async function sendCaptcha({ mobile, env }, context) {
    const { type } = env;
    (0, assert_1.default)(type === 'web');
    let { visitorId } = env;
    const { rowStore } = context;
    const now = Date.now();
    if (process.env.NODE_ENV !== 'development') {
        const [count1, count2] = await Promise.all([
            rowStore.count('captcha', {
                filter: {
                    visitorId,
                    $$createAt$$: {
                        $gt: now - 3600 * 1000,
                    },
                },
            }, context),
            rowStore.count('captcha', {
                filter: {
                    mobile,
                    $$createAt$$: {
                        $gt: now - 3600 * 1000,
                    },
                }
            }, context)
        ]);
        if (count1 > 5 || count2 > 5) {
            throw new types_1.OakUserException('您已发送很多次短信，请休息会再发吧');
        }
    }
    const { result: [captcha] } = await rowStore.select('captcha', {
        data: {
            id: 1,
            code: 1,
            $$createAt$$: 1,
        },
        filter: {
            mobile,
            $$createAt$$: {
                $gt: now - 60 * 1000,
            },
            expired: false,
        }
    }, context);
    if (captcha) {
        if (process.env.NODE_ENV === 'development') {
            const { code } = captcha;
            return `验证码[${code}]已创建`;
        }
        else if (captcha.$$createAt$$ - now < 60000) {
            throw new types_1.OakUserException('您的操作太迅捷啦，请稍等再点吧');
        }
        else {
            // todo 再次发送
            return '验证码已发送';
        }
    }
    else {
        let code;
        if (process.env.NODE_ENV === 'development') {
            code = mobile.substring(7);
        }
        else {
            code = Math.floor(Math.random() * 10000).toString();
            while (code.length < 4) {
                code += '0';
            }
        }
        const id = await generateNewId();
        console.log('captcha created', id);
        await rowStore.operate('captcha', {
            action: 'create',
            data: {
                id,
                mobile,
                code,
                visitorId,
                env,
                expired: false,
                expiresAt: now + 660 * 1000,
            }
        }, context);
        if (process.env.NODE_ENV === 'development') {
            return `验证码[${code}]已创建`;
        }
        else {
            return '验证码已创建';
        }
    }
}
exports.sendCaptcha = sendCaptcha;
