import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import WechatSDK from 'oak-external-sdk/lib/WechatSDK';
import { assert } from 'oak-domain/lib/utils/assert';
import { OakRowInconsistencyException, OakUnloggedInException, OakUserException, OakUserUnpermittedException, } from 'oak-domain/lib/types';
import { composeFileUrl } from '../utils/cos';
import { OakChangeLoginWayException, OakDistinguishUserException, OakUserDisabledException, } from '../types/Exception';
import { encryptPasswordSha1 } from '../utils/password';
import { tokenProjection } from '../types/Projection';
import { sendSms } from '../utils/sms';
import { mergeUser } from './user';
import { cloneDeep, pick } from 'oak-domain/lib/utils/lodash';
async function makeDistinguishException(userId, context, message) {
    const [user] = await context.select('user', {
        data: {
            id: 1,
            password: 1,
            passwordSha1: 1,
            idState: 1,
            wechatUser$user: {
                $entity: 'wechatUser',
                data: {
                    id: 1,
                },
            },
            email$user: {
                $entity: 'email',
                data: {
                    id: 1,
                    email: 1,
                },
            },
        },
        filter: {
            id: userId,
        },
    }, {
        dontCollect: true,
    });
    assert(user);
    const { password, passwordSha1, idState, wechatUser$user, email$user } = user;
    return new OakDistinguishUserException(userId, !!(password || passwordSha1), idState === 'verified', wechatUser$user.length > 0, email$user.length > 0, message);
}
async function tryMakeChangeLoginWay(userId, context) {
    const [user] = await context.select('user', {
        data: {
            id: 1,
            idState: 1,
            wechatUser$user: {
                $entity: 'wechatUser',
                data: {
                    id: 1,
                },
            },
            email$user: {
                $entity: 'email',
                data: {
                    id: 1,
                    email: 1,
                },
            },
        },
        filter: {
            id: userId,
        },
    }, {
        dontCollect: true,
    });
    assert(user);
    const { idState, wechatUser$user, email$user } = user;
    if (idState === 'verified' ||
        (wechatUser$user && wechatUser$user.length > 0) ||
        (email$user && email$user.length > 0)) {
        return new OakChangeLoginWayException(userId, idState === 'verified', !!(wechatUser$user && wechatUser$user.length > 0), !!(email$user && email$user.length > 0));
    }
}
async function dealWithUserState(user, context, tokenData) {
    switch (user.userState) {
        case 'disabled': {
            throw new OakUserDisabledException();
        }
        case 'shadow': {
            return {
                userId: user.id,
                user: {
                    id: await generateNewIdAsync(),
                    action: 'activate',
                    data: {},
                },
            };
        }
        case 'merged': {
            assert(user?.refId);
            const [user2] = await context.select('user', {
                data: {
                    id: 1,
                    userState: 1,
                    refId: 1,
                    wechatUser$user: {
                        $entity: 'wechatUser',
                        data: {
                            id: 1,
                        },
                    },
                    userSystem$user: {
                        $entity: 'userSystem',
                        data: {
                            id: 1,
                            systemId: 1,
                        },
                    },
                },
                filter: {
                    id: user.refId,
                },
            }, {
                dontCollect: true,
            });
            return await dealWithUserState(user2, context, tokenData);
        }
        default: {
            assert(user.userState === 'normal');
            return {
                userId: user.id,
            };
        }
    }
}
function autoMergeUser(context) {
    const { system } = context.getApplication();
    return !!system.config.App.mergeUserDirectly;
}
/**
 * 根据user的不同情况，完成登录动作
 * @param env
 * @param context
 * @param user
 * @return tokenValue
 */
async function setUpTokenAndUser(env, context, entity, // 支持更多的登录渠道使用此函数创建token
entityId, // 如果是现有对象传id，如果没有对象传createData
createData, user) {
    const currentToken = context.getToken(true);
    const schema = context.getSchema();
    assert(schema.hasOwnProperty(entity), `${entity}必须是有效的对象名 `);
    assert(schema.token.attributes.entity.ref.includes(entity), `${entity}必须是token的有效关联对象`);
    assert(schema[entity].attributes.hasOwnProperty('userId') &&
        schema[entity].attributes.userId.ref ===
            'user', `${entity}必须有指向user的userId属性`);
    if (currentToken) {
        assert(currentToken.id);
        assert(currentToken.userId);
        if (user) {
            // 有用户，和当前用户进行合并
            const { userState } = user;
            switch (userState) {
                case 'normal': {
                    if (currentToken.userId === user.id) {
                        return currentToken.value;
                    }
                    const autoMerge = autoMergeUser(context);
                    if (autoMerge) {
                        await mergeUser({ from: user.id, to: currentToken.userId, mergeMobile: true, mergeWechatUser: true, mergeEmail: true }, context, true);
                        return currentToken.value;
                    }
                    throw await makeDistinguishException(user.id, context);
                }
                case 'shadow': {
                    assert(currentToken.userId !== user.id);
                    const autoMerge = autoMergeUser(context);
                    if (autoMerge) {
                        await mergeUser({ from: user.id, to: currentToken.userId, mergeMobile: true, mergeWechatUser: true, mergeEmail: true }, context, true);
                        return currentToken.value;
                    }
                    throw await makeDistinguishException(user.id, context);
                }
                case 'disabled': {
                    throw new OakUserDisabledException();
                }
                case 'merged': {
                    assert(user.refId);
                    if (user.refId === currentToken.userId) {
                        return currentToken.value;
                    }
                    const autoMerge = autoMergeUser(context);
                    if (autoMerge) {
                        // 说明一个用户被其他用户merge了，现在还是暂时先merge，后面再说
                        console.warn(`用户${user.id}已经是merged状态「${user.refId}」，再次被merged到「${currentToken.userId}]」`);
                        await mergeUser({ from: user.id, to: currentToken.userId, mergeMobile: true, mergeWechatUser: true, mergeEmail: true }, context, true);
                        return currentToken.value;
                    }
                    throw await makeDistinguishException(user.id, context);
                }
                default: {
                    assert(false, `不能理解的user状态「${userState}」`);
                }
            }
        }
        else {
            // 没用户，指向当前用户
            assert(createData && !entityId);
            if (createData) {
                await context.operate(entity, {
                    id: await generateNewIdAsync(),
                    action: 'create',
                    data: Object.assign(createData, {
                        userId: currentToken.userId,
                    }),
                }, { dontCollect: entity !== 'mobile' });
            }
            else {
                assert(entityId);
                await context.operate(entity, {
                    id: await generateNewIdAsync(),
                    action: 'update',
                    data: {
                        userId: currentToken.userId,
                    },
                    filter: {
                        id: entityId,
                    },
                }, { dontCollect: entity !== 'mobile' });
            }
            return currentToken.value;
        }
    }
    else {
        /* if (entityId) {
            // 已经有相应对象，判定一下能否重用上一次的token
            // 不再重用了
            const application = context.getApplication();
            const [originToken] = await context.select(
                'token',
                {
                    data: {
                        id: 1,
                        value: 1,
                    },
                    filter: {
                        applicationId: application!.id,
                        ableState: 'enabled',
                        entity,
                        entityId: entityId,
                    },
                },
                { dontCollect: true }
            );
            if (originToken) {
                return originToken.value!;
            }
        } */
        const tokenData = {
            id: await generateNewIdAsync(),
            env,
            refreshedAt: Date.now(),
            value: await generateNewIdAsync(),
        };
        if (user) {
            // 根据此用户状态进行处理
            const { userState } = user;
            let userId = user.id;
            switch (userState) {
                case 'normal': {
                    break;
                }
                case 'merged': {
                    userId = user.refId;
                    break;
                }
                case 'disabled': {
                    throw new OakUserDisabledException();
                }
                case 'shadow': {
                    await context.operate('user', {
                        id: await generateNewIdAsync(),
                        action: 'activate',
                        data: {},
                        filter: {
                            id: userId,
                        },
                    }, { dontCollect: true });
                    break;
                }
                default: {
                    assert(false, `不能理解的user状态「${userState}」`);
                }
            }
            tokenData.userId = userId;
            tokenData.applicationId = context.getApplicationId();
            tokenData.playerId = userId;
            if (entityId) {
                tokenData.entity = entity;
                tokenData.entityId = entityId;
            }
            else {
                assert(createData);
                Object.assign(tokenData, {
                    [entity]: {
                        id: await generateNewIdAsync(),
                        action: 'create',
                        data: Object.assign(createData, {
                            userId,
                        }),
                    },
                });
            }
            await context.operate('token', {
                id: await generateNewIdAsync(),
                action: 'create',
                data: tokenData,
            }, { dontCollect: true });
            return tokenData.value;
        }
        else {
            // 创建新用户
            // 要先create token，再create entity。不然可能权限会被挡住
            const userData = {
                id: await generateNewIdAsync(),
                userState: 'normal',
            };
            await context.operate('user', {
                id: await generateNewIdAsync(),
                action: 'create',
                data: userData,
            }, {});
            assert(entityId || createData.id, 'entityId和createData必须存在一项');
            tokenData.userId = userData.id;
            tokenData.playerId = userData.id;
            tokenData.entity = entity;
            tokenData.entityId = entityId || createData.id;
            await context.operate('token', {
                id: await generateNewIdAsync(),
                action: 'create',
                data: tokenData,
            }, { dontCollect: true });
            await context.setTokenValue(tokenData.value);
            if (createData) {
                await context.operate(entity, {
                    id: await generateNewIdAsync(),
                    action: 'create',
                    data: Object.assign(createData, {
                        userId: userData.id,
                    }),
                }, { dontCollect: true });
            }
            else {
                assert(entityId);
                await context.operate(entity, {
                    id: await generateNewIdAsync(),
                    action: 'update',
                    data: {
                        userId: userData.id,
                    },
                    filter: {
                        id: entityId,
                    },
                }, { dontCollect: true });
            }
            return tokenData.value;
        }
    }
}
async function setupMobile(mobile, env, context) {
    const result2 = await context.select('mobile', {
        data: {
            id: 1,
            mobile: 1,
            userId: 1,
            ableState: 1,
            user: {
                id: 1,
                userState: 1,
                refId: 1,
                ref: {
                    id: 1,
                    userState: 1,
                    refId: 1,
                },
                wechatUser$user: {
                    $entity: 'wechatUser',
                    data: {
                        id: 1,
                    },
                },
                userSystem$user: {
                    $entity: 'userSystem',
                    data: {
                        id: 1,
                        systemId: 1,
                    },
                },
            },
        },
        filter: {
            mobile,
            ableState: 'enabled',
        },
    }, { dontCollect: true });
    if (result2.length > 0) {
        // 此手机号已经存在
        assert(result2.length === 1);
        const [mobileRow] = result2;
        const { user } = mobileRow;
        const { userState, ref } = user;
        if (userState === 'merged') {
            return await setUpTokenAndUser(env, context, 'mobile', mobileRow.id, undefined, ref);
        }
        return await setUpTokenAndUser(env, context, 'mobile', mobileRow.id, undefined, user);
    }
    else {
        //此手机号不存在
        return await setUpTokenAndUser(env, context, 'mobile', undefined, {
            id: await generateNewIdAsync(),
            mobile,
        });
    }
}
async function loadTokenInfo(tokenValue, context) {
    return await context.select('token', {
        data: cloneDeep(tokenProjection),
        filter: {
            value: tokenValue,
        },
    }, {});
}
export async function loginByMobile(params, context) {
    const { mobile, captcha, password, env, disableRegister } = params;
    const loginLogic = async () => {
        const systemId = context.getSystemId();
        if (captcha) {
            const result = await context.select('captcha', {
                data: {
                    id: 1,
                    expired: 1,
                },
                filter: {
                    mobile,
                    code: captcha,
                },
                sorter: [
                    {
                        $attr: {
                            $$createAt$$: 1,
                        },
                        $direction: 'desc',
                    },
                ],
                indexFrom: 0,
                count: 1,
            }, { dontCollect: true });
            if (result.length > 0) {
                const [captchaRow] = result;
                if (captchaRow.expired) {
                    throw new OakUserException('验证码已经过期');
                }
                // 到这里说明验证码已经通过
                return await setupMobile(mobile, env, context);
            }
            else {
                throw new OakUserException('验证码无效');
            }
        }
        else {
            assert(password);
            const result = await context.select('mobile', {
                data: {
                    id: 1,
                    userId: 1,
                    ableState: 1,
                },
                filter: {
                    mobile: mobile,
                    user: {
                        $or: [
                            {
                                password,
                            },
                            {
                                passwordSha1: encryptPasswordSha1(password),
                            },
                        ],
                    },
                },
            }, {
                dontCollect: true,
            });
            switch (result.length) {
                case 0: {
                    throw new OakUserException('用户名与密码不匹配');
                }
                case 1: {
                    const [mobileRow] = result;
                    const { ableState, userId } = mobileRow;
                    if (ableState === 'disabled') {
                        // 虽然密码和手机号匹配，但手机号已经禁用了，在可能的情况下提醒用户使用其它方法登录
                        const exception = await tryMakeChangeLoginWay(userId, context);
                        if (exception) {
                            throw exception;
                        }
                    }
                    return await setupMobile(mobile, env, context);
                }
                default: {
                    throw new Error(`手机号和密码匹配出现雷同，mobile id是[${result
                        .map((ele) => ele.id)
                        .join(',')}], mobile是${mobile}`);
                }
            }
        }
    };
    const closeRootMode = context.openRootMode();
    if (disableRegister) {
        const [existMobile] = await context.select('mobile', {
            data: {
                id: 1,
                mobile: 1,
            },
            filter: {
                mobile: mobile,
                ableState: 'enabled',
            },
        }, { dontCollect: true });
        if (!existMobile) {
            closeRootMode();
            throw new OakUserException('账号不存在');
        }
    }
    const tokenValue = await loginLogic();
    await loadTokenInfo(tokenValue, context);
    closeRootMode();
    return tokenValue;
}
async function setUserInfoFromWechat(user, userInfo, context) {
    const application = context.getApplication();
    const applicationId = context.getApplicationId();
    const config = application?.system?.config || application?.system?.platform?.config;
    const { nickname, gender, avatar } = userInfo;
    const { nickname: originalNickname, gender: originalGender, extraFile$entity, } = user;
    const updateData = {};
    if (nickname && nickname !== originalNickname) {
        Object.assign(updateData, {
            nickname,
        });
    }
    if (gender && gender !== originalGender) {
        Object.assign(updateData, {
            gender,
        });
    }
    if (avatar &&
        (extraFile$entity?.length === 0 ||
            composeFileUrl(extraFile$entity[0], context) !== avatar)) {
        // 需要更新新的avatar extra file
        const extraFileOperations = [
            {
                id: await generateNewIdAsync(),
                action: 'create',
                data: Object.assign({
                    id: await generateNewIdAsync(),
                    tag1: 'avatar',
                    entity: 'user',
                    entityId: user.id,
                    objectId: await generateNewIdAsync(),
                    origin: 'unknown',
                    extra1: avatar,
                    type: 'image',
                    filename: '',
                    bucket: '',
                    applicationId: applicationId,
                }),
            },
        ];
        if (extraFile$entity.length > 0) {
            extraFileOperations.push({
                id: await generateNewIdAsync(),
                action: 'remove',
                data: {},
                filter: {
                    id: extraFile$entity[0].id,
                },
            });
        }
        Object.assign(updateData, {
            extraFile$entity: extraFileOperations,
        });
    }
    if (Object.keys(updateData).length > 0) {
        await context.operate('user', {
            id: await generateNewIdAsync(),
            action: 'update',
            data: updateData,
            filter: {
                id: user.id,
            },
        }, {});
    }
}
async function tryRefreshWechatPublicUserInfo(wechatUserId, context) {
    const [wechatUser] = await context.select('wechatUser', {
        data: {
            id: 1,
            accessToken: 1,
            refreshToken: 1,
            atExpiredAt: 1,
            rtExpiredAt: 1,
            scope: 1,
            openId: 1,
            user: {
                id: 1,
                nickname: 1,
                gender: 1,
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
                        entity: 1,
                        entityId: 1,
                    },
                    filter: {
                        tag1: 'avatar',
                    },
                },
            },
        },
        filter: {
            id: wechatUserId,
        },
    }, { dontCollect: true });
    const application = context.getApplication();
    const { type, config } = application;
    assert(type !== 'wechatMp' && type !== 'native');
    if (type === 'web') {
        return;
    }
    let appId, appSecret;
    const config2 = config;
    appId = config2.appId;
    appSecret = config2.appSecret;
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    let { accessToken, refreshToken, atExpiredAt, rtExpiredAt, scope, openId, user, } = wechatUser;
    const now = Date.now();
    assert(scope.toLowerCase().includes('userinfo'));
    if (rtExpiredAt < now) {
        // refreshToken过期，直接返回未登录异常，使用户去重新登录
        throw new OakUnloggedInException();
    }
    if (atExpiredAt < now) {
        // 刷新accessToken
        const { accessToken: at2, atExpiredAt: ate2, scope: s2, } = await wechatInstance.refreshUserAccessToken(refreshToken);
        await context.operate('wechatUser', {
            id: await generateNewIdAsync(),
            action: 'update',
            data: {
                accessToken: at2,
                atExpiredAt: ate2,
                scope: s2,
            },
        }, { dontCollect: true });
        accessToken = at2;
    }
    const { nickname, gender, avatar } = await wechatInstance.getUserInfo(accessToken, openId);
    await setUserInfoFromWechat(user, { nickname, gender: gender, avatar }, context);
}
export async function refreshWechatPublicUserInfo({}, context) {
    const tokenValue = context.getTokenValue();
    const [token] = await context.select('token', {
        data: {
            id: 1,
            entity: 1,
            entityId: 1,
        },
        filter: {
            id: tokenValue,
        },
    }, { dontCollect: true });
    assert(token.entity === 'wechatUser');
    assert(token.entityId);
    return await tryRefreshWechatPublicUserInfo(token.entityId, context);
}
// 用户在微信端授权登录后，在web端触发该方法
export async function loginByWechat(params, context) {
    const { wechatLoginId, env } = params;
    const closeRootMode = context.openRootMode();
    const [wechatLoginData] = await context.select('wechatLogin', {
        data: {
            id: 1,
            userId: 1,
            type: 1,
        },
        filter: {
            id: wechatLoginId,
        },
    }, {
        dontCollect: true,
    });
    const [wechatUserLogin] = await context.select('wechatUser', {
        data: {
            id: 1,
            userId: 1,
            user: {
                id: 1,
                name: 1,
                nickname: 1,
                userState: 1,
                refId: 1,
                isRoot: 1,
            },
        },
        filter: {
            userId: wechatLoginData.userId,
        },
    }, {
        dontCollect: true,
    });
    const tokenValue = await setUpTokenAndUser(env, context, 'wechatUser', wechatUserLogin.id, undefined, wechatUserLogin.user);
    await loadTokenInfo(tokenValue, context);
    closeRootMode();
    return tokenValue;
}
async function loginFromWechatEnv(code, env, context, wechatLoginId) {
    const application = context.getApplication();
    const { type, config, systemId } = application;
    let appId, appSecret;
    if (type === 'wechatPublic') {
        const config2 = config;
        appId = config2.appId;
        appSecret = config2.appSecret;
    }
    else if (type === 'wechatMp') {
        const config2 = config;
        appId = config2.appId;
        appSecret = config2.appSecret;
    }
    else {
        assert(type === 'web');
        const config2 = config;
        assert(config2.wechat);
        appId = config2.wechat.appId;
        appSecret = config2.wechat.appSecret;
    }
    const wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
    const { isSnapshotUser, openId, unionId, ...wechatUserData } = await wechatInstance.code2Session(code);
    if (isSnapshotUser) {
        throw new OakUserException('请使用完整服务后再进行登录操作');
    }
    const OriginMap = {
        web: 'web',
        wechatPublic: 'public',
        wechatMp: 'mp',
        native: 'native',
    };
    const createWechatUserAndReturnTokenId = async (user) => {
        const wechatUserCreateData = {
            id: await generateNewIdAsync(),
            unionId,
            origin: OriginMap[type],
            openId,
            applicationId: application.id,
            ...wechatUserData,
        };
        const tokenValue = await setUpTokenAndUser(env, context, 'wechatUser', undefined, wechatUserCreateData, user);
        return tokenValue;
    };
    // 扫码者
    const [wechatUser] = await context.select('wechatUser', {
        data: {
            id: 1,
            userId: 1,
            unionId: 1,
            user: {
                id: 1,
                name: 1,
                nickname: 1,
                userState: 1,
                refId: 1,
                isRoot: 1,
            },
        },
        filter: {
            applicationId: application.id,
            openId,
            origin: OriginMap[type],
        },
    }, {
        dontCollect: true,
    });
    if (wechatLoginId) {
        const updateWechatLogin = async (updateData) => {
            await context.operate('wechatLogin', {
                id: await generateNewIdAsync(),
                action: 'update',
                data: updateData,
                filter: {
                    id: wechatLoginId,
                },
            }, { dontCollect: true });
        };
        // 扫码产生的实体wechaLogin
        const [wechatLoginData] = await context.select('wechatLogin', {
            data: {
                id: 1,
                userId: 1,
                type: 1,
                user: {
                    id: 1,
                    name: 1,
                    nickname: 1,
                    userState: 1,
                    refId: 1,
                    isRoot: 1,
                },
            },
            filter: {
                id: wechatLoginId,
            },
        }, {
            dontCollect: true,
        });
        // 用户已登录，通过扫描二维码绑定
        if (wechatLoginData && wechatLoginData.type === 'bind') {
            // 首先通过wechaLogin.userId查询是否存在wechatUser 判断是否绑定
            // 登录者
            const [wechatUserLogin] = await context.select('wechatUser', {
                data: {
                    id: 1,
                    userId: 1,
                    user: {
                        id: 1,
                        name: 1,
                        nickname: 1,
                        userState: 1,
                        refId: 1,
                        isRoot: 1,
                    },
                },
                filter: {
                    userId: wechatLoginData.userId,
                },
            }, {
                dontCollect: true,
            });
            // 已绑定
            assert(!wechatUserLogin, '登录者已经绑定微信公众号');
            // 未绑定的情况，就要先看扫码者是否绑定了公众号
            // 扫码者已绑定, 将扫码者的userId替换成登录者的userId
            if (wechatUser) {
                await context.operate('wechatUser', {
                    id: await generateNewIdAsync(),
                    action: 'update',
                    data: {
                        userId: wechatLoginData.userId,
                    },
                    filter: {
                        id: wechatUser.id,
                    },
                }, { dontCollect: true });
                const tokenValue = await setUpTokenAndUser(env, context, 'wechatUser', wechatUser.id, undefined, wechatUserLogin
                    .user);
                await updateWechatLogin({ successed: true });
                return tokenValue;
            }
            else {
                const tokenValue = await createWechatUserAndReturnTokenId(wechatLoginData.user);
                await updateWechatLogin({ successed: true });
                return tokenValue;
            }
        }
        // 用户未登录情况下
        else if (wechatLoginData.type === 'login') {
            // wechatUser存在直接登录
            if (wechatUser) {
                const tokenValue = await setUpTokenAndUser(env, context, 'wechatUser', wechatUser.id, undefined, wechatUser.user);
                await updateWechatLogin({ successed: true });
                return tokenValue;
            }
            else {
                // 创建user和wechatUser(绑定并登录)
                const userId = await generateNewIdAsync();
                const userData = {
                    id: userId,
                    userState: 'normal',
                };
                await context.operate('user', {
                    id: await generateNewIdAsync(),
                    action: 'create',
                    data: userData,
                }, {});
                const tokenValue = await createWechatUserAndReturnTokenId(userData);
                await updateWechatLogin({ userId, successed: true });
                return tokenValue;
            }
        }
    }
    else {
        if (wechatUser) {
            const tokenValue = await setUpTokenAndUser(env, context, 'wechatUser', wechatUser.id, undefined, wechatUser.user);
            const wechatUserUpdateData = wechatUserData;
            if (unionId !== wechatUser.unionId) {
                Object.assign(wechatUserUpdateData, {
                    unionId,
                });
            }
            await context.operate('wechatUser', {
                id: await generateNewIdAsync(),
                action: 'update',
                data: wechatUserUpdateData,
                filter: {
                    id: wechatUser.id,
                },
            }, { dontCollect: true });
            return tokenValue;
        }
        else if (unionId) {
            // 如果有unionId，查找同一个system下有没有相同的unionId
            const [wechatUser3] = await context.select('wechatUser', {
                data: {
                    id: 1,
                    userId: 1,
                    unionId: 1,
                    user: {
                        id: 1,
                        userState: 1,
                        refId: 1,
                    },
                },
                filter: {
                    application: {
                        systemId: application.systemId,
                    },
                    unionId,
                },
            }, {
                dontCollect: true,
            });
            if (wechatUser3) {
                const wechatUserCreateData = {
                    id: await generateNewIdAsync(),
                    unionId,
                    origin: OriginMap[type],
                    openId,
                    applicationId: application.id,
                    ...wechatUserData,
                };
                const tokenValue = await setUpTokenAndUser(env, context, 'wechatUser', undefined, wechatUserCreateData, wechatUser3.user);
                if (!wechatUser3.userId) {
                    // 这里顺便帮其它wechatUser数据也补上相应的userId
                    await context.operate('wechatUser', {
                        id: await generateNewIdAsync(),
                        action: 'update',
                        data: {
                            userId: wechatUserCreateData.userId, // 在setUpTokenAndUser内赋上值
                        },
                        filter: {
                            id: wechatUser3.id,
                        },
                    }, { dontCollect: true });
                }
                return tokenValue;
            }
        }
    }
    // 到这里都是要同时创建wechatUser和user对象了
    return await createWechatUserAndReturnTokenId();
}
/**
 * 公众号授权登录
 * @param param0
 * @param context
 */
export async function loginWechat({ code, env, wechatLoginId, }, context) {
    const closeRootMode = context.openRootMode();
    const tokenValue = await loginFromWechatEnv(code, env, context, wechatLoginId);
    const [tokenInfo] = await loadTokenInfo(tokenValue, context);
    assert(tokenInfo.entity === 'wechatUser');
    await context.setTokenValue(tokenValue);
    await tryRefreshWechatPublicUserInfo(tokenInfo.entityId, context);
    closeRootMode();
    return tokenValue;
}
/**
 * 小程序授权登录
 * @param param0
 * @param context
 * @returns
 */
export async function loginWechatMp({ code, env, }, context) {
    const closeRootMode = context.openRootMode();
    const tokenValue = await loginFromWechatEnv(code, env, context);
    await loadTokenInfo(tokenValue, context);
    closeRootMode();
    return tokenValue;
}
/**
 * 同步从wx.getUserProfile拿到的用户信息
 * @param param0
 * @param context
 */
export async function syncUserInfoWechatMp({ nickname, avatarUrl, encryptedData, iv, signature, }, context) {
    const { userId } = context.getToken();
    const application = context.getApplication();
    const config = application?.system?.config || application?.system?.platform?.config;
    const [{ sessionKey, user }] = await context.select('wechatUser', {
        data: {
            id: 1,
            sessionKey: 1,
            nickname: 1,
            avatar: 1,
            user: {
                id: 1,
                nickname: 1,
                gender: 1,
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
                        entity: 1,
                        entityId: 1,
                    },
                    filter: {
                        tag1: 'avatar',
                    },
                },
            },
        },
        filter: {
            userId: userId,
            applicationId: application.id,
        },
    }, {
        dontCollect: true,
    });
    const { type, config: config2 } = application;
    assert(type === 'wechatMp' || config2.type === 'wechatMp');
    const { appId, appSecret } = config2;
    const wechatInstance = WechatSDK.getInstance(appId, 'wechatMp', appSecret);
    const result = wechatInstance.decryptData(sessionKey, encryptedData, iv, signature);
    // 实测发现解密出来的和userInfo完全一致……
    await setUserInfoFromWechat(user, { nickname, avatar: avatarUrl }, context);
}
export async function sendCaptcha({ mobile, env, type: type2, }, context) {
    const { type } = env;
    assert(type === 'web' || type === 'native');
    let { visitorId } = env;
    const application = context.getApplication();
    const { system } = application;
    const mockSend = system?.config?.Sms?.mockSend;
    const now = Date.now();
    const duration = 1; // 多少分钟内有效
    const closeRootMode = context.openRootMode();
    if (process.env.NODE_ENV !== 'development' && !mockSend) {
        const [count1, count2] = await Promise.all([
            context.count('captcha', {
                filter: {
                    visitorId,
                    $$createAt$$: {
                        $gt: now - 3600 * 1000,
                    },
                    type: type2,
                },
            }, {
                dontCollect: true,
            }),
            context.count('captcha', {
                filter: {
                    mobile,
                    $$createAt$$: {
                        $gt: now - 3600 * 1000,
                    },
                    type: type2,
                },
            }, {
                dontCollect: true,
            }),
        ]);
        if (count1 > 5 || count2 > 5) {
            closeRootMode();
            throw new OakUserException('您已发送很多次短信，请休息会再发吧');
        }
    }
    const [captcha] = await context.select('captcha', {
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
            type: type2,
        },
    }, {
        dontCollect: true,
    });
    if (captcha) {
        const code = captcha.code;
        if (process.env.NODE_ENV !== 'production' || mockSend) {
            closeRootMode();
            return `验证码[${code}]已创建`;
        }
        else if (captcha.$$createAt$$ - now < 60000) {
            closeRootMode();
            throw new OakUserException('您的操作太迅捷啦，请稍等再点吧');
        }
        else {
            // todo 再次发送
            const result = await sendSms({
                origin: 'tencent',
                templateName: '登录',
                mobile,
                templateParam: { code, duration: duration.toString() },
            }, context);
            closeRootMode();
            if (result.success) {
                return '验证码已发送';
            }
            return '验证码发送失败';
        }
    }
    else {
        let code;
        if (process.env.NODE_ENV === 'development' || mockSend) {
            code = mobile.substring(7);
        }
        else {
            code = Math.floor(Math.random() * 10000).toString();
            while (code.length < 4) {
                code += '0';
            }
        }
        const id = await generateNewIdAsync();
        await context.operate('captcha', {
            id: await generateNewIdAsync(),
            action: 'create',
            data: {
                id,
                mobile,
                code,
                visitorId,
                env,
                expired: false,
                expiresAt: now + 660 * 1000,
                type: type2,
            },
        }, {
            dontCollect: true,
        });
        if (process.env.NODE_ENV === 'development' || mockSend) {
            closeRootMode();
            return `验证码[${code}]已创建`;
        }
        else {
            //发送短信
            const result = await sendSms({
                origin: 'tencent',
                templateName: '登录',
                mobile,
                templateParam: { code, duration: duration.toString() },
            }, context);
            closeRootMode();
            if (result.success) {
                return '验证码已发送';
            }
            return '验证码发送失败';
        }
    }
}
export async function switchTo({ userId }, context) {
    const reallyRoot = context.isReallyRoot();
    if (!reallyRoot) {
        throw new OakUserUnpermittedException('user', { id: 'switchTo', action: 'switch', data: {}, filter: { id: userId } });
    }
    const currentUserId = context.getCurrentUserId();
    if (currentUserId === userId) {
        throw new OakRowInconsistencyException(undefined, '您已经是当前用户');
    }
    const token = context.getToken();
    await context.operate('token', {
        id: await generateNewIdAsync(),
        action: 'update',
        data: {
            userId,
        },
        filter: {
            id: token.id,
        },
    }, {});
}
export async function getWechatMpUserPhoneNumber({ code, env }, context) {
    const application = context.getApplication();
    const { type, config, systemId } = application;
    assert(type === 'wechatMp' && config.type === 'wechatMp');
    const config2 = config;
    const { appId, appSecret } = config2;
    const wechatInstance = WechatSDK.getInstance(appId, 'wechatMp', appSecret);
    const result = await wechatInstance.getUserPhoneNumber(code);
    const closeRootMode = context.openRootMode();
    //获取 绑定的手机号码
    const phoneNumber = result?.phoneNumber;
    const reuslt = await setupMobile(phoneNumber, env, context);
    closeRootMode();
    return reuslt;
}
export async function logout(params, context) {
    const { tokenValue } = params;
    if (tokenValue) {
        const closeRootMode = context.openRootMode();
        try {
            await context.operate('token', {
                id: await generateNewIdAsync(),
                action: 'disable',
                data: {},
                filter: {
                    value: tokenValue,
                    ableState: 'enabled',
                },
            }, { dontCollect: true });
        }
        catch (err) {
            closeRootMode();
            throw err;
        }
        closeRootMode();
    }
}
/**
 * 创建一个当前parasite上的token
 * @param params
 * @param context
 * @returns
 */
export async function wakeupParasite(params, context) {
    const { id, env } = params;
    const [parasite] = await context.select('parasite', {
        data: {
            id: 1,
            expired: 1,
            multiple: 1,
            userId: 1,
            tokenLifeLength: 1,
            user: {
                id: 1,
                userState: 1,
            },
        },
        filter: {
            id,
        },
    }, { dontCollect: true });
    if (parasite.expired) {
        throw new OakRowInconsistencyException({
            a: 's',
            d: {
                parasite: {
                    [id]: pick(parasite, ['id', 'expired']),
                },
            },
        }, '数据已经过期');
    }
    if (parasite.user?.userState !== 'shadow') {
        throw new OakUserException('此用户已经登录过系统，不允许借用身份');
    }
    const closeRootMode = context.openRootMode();
    if (!parasite.multiple) {
        await context.operate('parasite', {
            id: await generateNewIdAsync(),
            action: 'wakeup',
            data: {
                expired: true,
            },
            filter: {
                id,
            },
        }, { dontCollect: true });
    }
    const tokenValue = await generateNewIdAsync();
    await context.operate('token', {
        id: await generateNewIdAsync(),
        action: 'create',
        data: {
            id: await generateNewIdAsync(),
            entity: 'parasite',
            entityId: id,
            userId: parasite.userId,
            playerId: parasite.userId,
            disablesAt: Date.now() + parasite.tokenLifeLength,
            env,
            refreshedAt: Date.now(),
            value: tokenValue,
            applicationId: context.getApplicationId(),
        },
    }, { dontCollect: true });
    await loadTokenInfo(tokenValue, context);
    closeRootMode();
    return tokenValue;
}
/**
 * todo 检查登录环境一致性，同一个token不能跨越不同设备
 * @param env1
 * @param env2
 * @returns
 */
function checkTokenEnvConsistency(env1, env2) {
    if (env1.type !== env2.type) {
        return false;
    }
    switch (env1.type) {
        case 'web': {
            return env1.visitorId === env2.visitorId;
        }
        case 'wechatMp': {
            return true;
        }
        case 'native': {
            return env1.visitorId === env2.visitorId;
        }
        default: {
            return false;
        }
    }
}
export async function refreshToken(params, context) {
    const { env, tokenValue } = params;
    const fn = context.openRootMode();
    let [token] = await context.select('token', {
        data: Object.assign({
            env: 1,
            ...tokenProjection,
        }),
        filter: {
            value: tokenValue,
        },
    }, {});
    assert(token);
    const now = Date.now();
    if (!checkTokenEnvConsistency(env, token.env)) {
        await context.operate('token', {
            id: await generateNewIdAsync(),
            action: 'disable',
            data: {},
            filter: {
                id: token.id,
            }
        }, { dontCollect: true });
        fn();
        return '';
    }
    if (process.env.OAK_PLATFORM === 'server') {
        // 只有server模式去刷新token
        // 'development' | 'production' | 'staging'
        const intervals = {
            development: 7200 * 1000,
            staging: 600 * 1000,
            production: 600 * 1000, // 十分钟
        };
        const interval = intervals[process.env.NODE_ENV] || 600 * 1000;
        if (now - token.refreshedAt > interval) {
            const newValue = await generateNewIdAsync();
            await context.operate('token', {
                id: await generateNewIdAsync(),
                action: 'update',
                data: {
                    value: newValue,
                    refreshedAt: now,
                },
                filter: {
                    id: token.id,
                },
            }, {});
            fn();
            return newValue;
        }
    }
    fn();
    return tokenValue;
}
