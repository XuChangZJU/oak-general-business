import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { EntityDict } from '../general-app-domain';
import { WechatSDK } from 'oak-external-sdk';
import { assert } from 'oak-domain/lib/utils/assert';
import { WechatMpConfig, WechatPublicConfig, WebConfig } from '../general-app-domain/Application/Schema';
import { CreateOperationData as CreateToken, WebEnv, WechatMpEnv } from '../general-app-domain/Token/Schema';
import { CreateOperationData as CreateWechatUser } from '../general-app-domain/WechatUser/Schema';
import { CreateOperationData as CreateUser, Schema as User } from '../general-app-domain/User/Schema';
import { Operation as ExtraFileOperation } from '../general-app-domain/ExtraFile/Schema';
import { isEqual } from 'oak-domain/lib/utils/lodash';
import { OakUserException } from 'oak-domain/lib/types';
import { composeFileUrl, decomposeFileUrl } from '../utils/extraFile';
import { OakChangeLoginWayException, OakDistinguishUserException, OakUserDisabledException } from '../types/Exception';
import { encryptPasswordSha1 } from '../utils/password';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';

async function makeDistinguishException<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(userId: string, context: Cxt) {
    const [user] = await context.select('user', {
        data: {
            id: 1,
            password: 1,
            passwordOrigin: 1,
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
                }
            }
        },
        filter: {
            id: userId,
        }
    }, {
        dontCollect: true,
    });
    assert(user);
    const { password, passwordSha1, idState, wechatUser$user, email$user } = user;

    return new OakDistinguishUserException(userId, !!(password || passwordSha1),
        idState === 'verified', (<any[]>wechatUser$user).length > 0, (<any[]>email$user).length > 0);
}

async function tryMakeChangeLoginWay<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(userId: string, context: Cxt) {
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
                }
            }
        },
        filter: {
            id: userId,
        }
    }, {
        dontCollect: true,
    });
    assert(user);
    const { idState, wechatUser$user, email$user } = user;
    if (idState === 'verified' || wechatUser$user && wechatUser$user.length > 0 || email$user && email$user.length > 0) {
        return new OakChangeLoginWayException(userId, idState === 'verified', !!(wechatUser$user && wechatUser$user.length > 0), !!(email$user && email$user.length > 0))
    }
}

async function setupMobile<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(mobile: string, env: WebEnv | WechatMpEnv, context: Cxt) {
    const currentToken =  context.getToken(true);
    const applicationId = context.getApplicationId();
    const systemId = context.getSystemId();

    const result2 = await context.select('mobile', {
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
                userSystem$user: {
                    $entity: 'userSystem',
                    data: {
                        id: 1,
                        systemId: 1,
                    },
                }
            },
        },
        filter: {
            mobile,
            ableState: 'enabled',
        }
    }, { dontCollect: true });
    if (result2.length > 0) {
        // 此手机号已经存在
        assert(result2.length === 1);
        const [ mobileRow ] = result2;
        if (currentToken) {
            if (currentToken.userId === mobileRow.userId) {
                return currentToken.id!;
            }
            else  {
                // 此时可能要合并用户，抛出OakDistinguishUser异常，用户根据自身情况选择合并
                const { userId } = mobileRow;
                throw await makeDistinguishException<ED, Cxt>(userId as string, context);
            }
        }
        else {
            // 此时以该手机号登录 todo根据环境来判断，用户也有可能是新获得此手机号，未来再进一步处理
            const tokenData: EntityDict['token']['CreateSingle']['data'] = {
                id: generateNewId(),
                applicationId: applicationId!,
                playerId: mobileRow.userId as string,
                env,
                entity: 'mobile',
                entityId: mobileRow.id as string,                
            };
            const { user } = mobileRow;
            const { userState } = user!;
            switch (userState) {
                case 'disabled': {
                    throw new OakUserDisabledException();
                }
                case 'shadow': {
                    Object.assign(tokenData, {
                        userId: mobileRow.userId,
                        user: {
                            id: generateNewId(),
                            action: 'activate',
                            data: {},
                        }
                    });
                    break;
                }
                default: {
                    assert(userState === 'normal');
                    Object.assign(tokenData, {
                        userId: mobileRow.userId,
                    });
                }
            }

            await context.operate('token', {
                id: generateNewId(),
                data: tokenData,
                action: 'create',
            }, {
                 dontCollect: true,
            });

            // 检查此user和system之间有没有关系，如果没有要补上
            if ((user as User)?.userSystem$user?.length == 0) {
                await context.operate('userSystem', {
                    id: generateNewId(),
                    action: 'create',
                    data: {
                        id: generateNewId(),
                        userId: (user as User).id!,
                        systemId,
                    }
                }, {
                    dontCollect: true,
                })
            }

            return tokenData.id;
        }
    }
    else {
        //此手机号不存在
        if (currentToken) {
            // 创建手机号并与之关联即可
            const mobileData: EntityDict['mobile']['CreateSingle']['data'] = {
                id: generateNewId(),
                mobile,
                userId: currentToken.userId!,
            };
            await context.operate('mobile', {
                id: generateNewId(),
                action: 'create',
                data: mobileData
            }, {});
            return currentToken.id!;
        }
        else {
            // 创建token, mobile, user
            const userData: EntityDict['user']['CreateSingle']['data'] = {
                id: generateNewId(),
                userState: 'normal',
            };
            await context.operate('user', {
                id: generateNewId(),
                action: 'create',
                data: userData,
            }, {});
            const tokenData: EntityDict['token']['CreateSingle']['data'] = {
                id: generateNewId(),
                userId: userData.id,
                playerId: userData.id,
                env,
                mobile: {
                    id: generateNewId(),
                    action: 'create',
                    data: {
                        id: generateNewId(),
                        mobile,    
                        userId: userData.id,                    
                    }
                }
            };
            await context.operate('token', {
                id: generateNewId(),
                action: 'create',
                data: tokenData,
            }, {});

            return tokenData.id;
        }
    }
}

async function loadTokenInfo<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(tokenId: string, context: Cxt ) {
    await context.select(
        'token',
        {
            data: {
                id: 1,
                userId: 1,
                ableState: 1,
                user: {
                    id: 1,
                    nickname: 1,
                    name: 1,
                    userState: 1,
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
                            type: 1,
                            entity: 1,
                            entityId: 1,
                            extension: 1,
                        },
                        filter: {
                            tag1: 'avatar',
                        },
                        indexFrom: 0,
                        count: 1,
                    },
                    mobile$user: {
                        $entity: 'mobile',
                        data: {
                            id: 1,
                            mobile: 1,
                            userId: 1,
                        },
                    },
                    userRole$user: {
                        $entity: 'userRole',
                        data: {
                            id: 1,
                            userId: 1,
                            roleId: 1,
                        },
                    },
                },
                player: {
                    id: 1,
                    userRole$user: {
                        $entity: 'userRole',
                        data: {
                            id: 1,
                            userId: 1,
                            roleId: 1,
                        },
                    },
                },
            },
            filter: {
                id: tokenId,
            },
        },
        {}
    );
}

export async function loginByMobile<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(
    params: { captcha?: string, password?: string, mobile: string, env: WebEnv | WechatMpEnv },
    context: Cxt): Promise<string> {
    const loginLogic = async () => {
        const { mobile, captcha, password, env } = params;
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
                sorter: [{
                    $attr: {
                        $$createAt$$: 1,
                    },
                    $direction: 'desc',
                }],
                indexFrom: 0,
                count: 1,
            }, { dontCollect: true });
            if (result.length > 0) {
                const [captchaRow] = result;
                if (captchaRow.expired) {
                    throw new OakUserException('验证码已经过期');
                }
    
                // 到这里说明验证码已经通过
                return await setupMobile<ED, Cxt>(mobile, env, context);
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
                            }
                        ],
                    },
                }
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
                        const exception = await tryMakeChangeLoginWay<ED, Cxt>(userId as string, context);
                        if (exception) {
                            throw exception;
                        }
                    }
                    return await setupMobile<ED, Cxt>(mobile, env, context);
                }
                default: {
                    throw new Error(`手机号和密码匹配出现雷同，mobile id是[${result.map(ele => ele.id).join(',')}], mobile是${mobile}`);
                }
            }
        }
    };

    const tokenId = await loginLogic();
    await loadTokenInfo<ED, Cxt>(tokenId, context);
    
    return tokenId;
}

/**
 * 公众号授权登录
 * @param param0 
 * @param context 
 */
export async function loginWechat<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({ code, env }: {
    code: string;
    env: WebEnv;
}, context: Cxt): Promise<string> {
    const loginLogic = async () => {
        const application = context.getApplication();
        const { type, config, systemId } = application!;
    
        // 可能type是web或者wechatPublic
        assert(type !== 'wechatMp' && config!.type !== 'wechatMp');
        let appId: string, appSecret: string;
        if (type === 'wechatPublic') {
            const config2 = config as WechatPublicConfig;
            appId = config2.appId;
            appSecret = config2.appSecret;
        } else {
            const config2 = config as WebConfig;
            assert(config2.wechat);
            appId = config2.wechat.appId;
            appSecret = config2.wechat.appSecret;
        }
        const wechatInstance = WechatSDK.getInstance(appId!, appSecret!, type!);
    
        const { sessionKey, openId, unionId } = await wechatInstance.code2Session(code);
    
        const [wechatUser] = await context.select('wechatUser', {
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
                applicationId: application!.id,
                openId,
            }
        }, {
            dontCollect: true,
        });
    
        const id = generateNewId();
        if (wechatUser) {
            const wechatUser2 = wechatUser!;
    
            const wechatUserUpdateData = {
                sessionKey,
            };
            if (unionId !== wechatUser.unionId as any) {
                Object.assign(wechatUserUpdateData, {
                    unionId,
                });
            }
            if (wechatUser2.userId) {
                // 若用户没有更换任何环境，则重用原来的token，避免token表增长过快
                const [token] = await context.select('token', {
                    data: {
                        id: 1,
                        applicationId: 1,
                        env: 1,
                    },
                    filter: {
                        applicationId: application!.id,
                        ableState: 'enabled',
                        userId: wechatUser2.userId,
                        playerId: wechatUser2.userId,
                        entity: 'wechatUser',
                        entityId: wechatUser2.id,
                    },
                }, {
                    blockTrigger: true,
                });
                if (token && isEqual(token.env, env)) {
                    await context.operate('token', {
                        id: generateNewId(),
                        action: 'update',
                        data: {
                            wechatUser: {
                                id: generateNewId(),
                                action: 'update',
                                data: wechatUserUpdateData,
                            }
                        },
                        filter: {
                            id: token.id as string,
                        },
                    },{
                        dontCollect: true,
                    });
                    return token.id!;
                }
    
                await context.operate('token', {
                    id: generateNewId(),
                    action: 'disable',
                    data: {
                    },
                    filter: {
                        applicationId: application!.id,
                        ableState: 'enabled',
                        userId: wechatUser2.userId,
                        playerId: wechatUser2.userId,
                    },
                }, {
                    dontCollect: true,
                });
            }
            else {
                // 创建user
                Object.assign(wechatUserUpdateData, {
                    user: {
                        id: generateNewId(),
                        action: 'create',
                        data: {
                            id: generateNewId(),
                            userState: 'normal',
                        } as CreateUser,
                    },
                });
            }
    
            await context.operate('token', {
                id: generateNewId(),
                action: 'create',
                data: {
                    id,
                    userId: wechatUser2.userId as string,
                    playerId: wechatUser2.userId as string,
                    applicationId: application!.id,
                    entity: 'wechatUser',
                    entityId: wechatUser2.id as string,
                    wechatUser: {
                        id: generateNewId(),
                        action: 'update',
                        data: wechatUserUpdateData,
                    },
                    env
                } as CreateToken
            }, {});
            return id;
    
        }
        else if (unionId) {
            // 如果有unionId，查找同一个system下有没有相同的unionId
            const [wechatUser3] = await context.select('wechatUser', {
                data: {
                    id: 1,
                    userId: 1,
                    unionId: 1,
                },
                filter: {
                    application: {
                        systemId: application!.systemId,
                    },
                    unionId,
                }
            }, {
                dontCollect: true,
            });
            const wechatUser2 = wechatUser3;
            if (wechatUser2 && wechatUser2.userId) {
                await context.operate('token', {
                    id: generateNewId(),
                    action: 'disable',
                    data: {
                    },
                    filter: {
                        applicationId: application!.id,
                        ableState: 'enabled',
                        userId: wechatUser2.userId,
                        playerId: wechatUser2.userId,
                    },
                }, {
                    dontCollect: true,
                });
    
                const wechatUserCreateData: CreateWechatUser = {
                    id: generateNewId(),
                    sessionKey,
                    unionId,
                    origin: 'mp',
                    openId,
                    applicationId: application!.id!,
                    userId: wechatUser2.userId,
                };
                await context.operate('token', {
                    id: generateNewId(),
                    action: 'create',
                    data: {
                        id,
                        userId: wechatUser2.userId,
                        playerId: wechatUser2.userId,
                        applicationId: application!.id,
                        wechatUser: {
                            id: generateNewId(),
                            action: 'create',
                            data: wechatUserCreateData,
                        },
                        env,
                    }
                }, {
                    dontCollect: true,
                });
                return id;
            }
        }
    
        // 到这里都是要同时创建wechatUser和user对象了
        const userData: CreateUser = {
            id: generateNewId(),
            userState: 'normal',
            userSystem$user: [
                {
                    id: generateNewId(),
                    action: 'create',
                    data: {
                        id: generateNewId(),
                        systemId,
                    },
                }
            ],
        };
        const wechatUserCreateData: CreateWechatUser = {
            id: generateNewId(),
            sessionKey,
            unionId,
            origin: type === 'wechatPublic' ? 'public' : 'web',
            openId,
            applicationId: application!.id!,
            user: {
                id: generateNewId(),
                action: 'create',
                data: userData,
            }
        };
        await context.operate('token', {
            id: generateNewId(),
            action: 'create',
            data: {
                id,
                userId: userData.id,
                playerId: userData.id,
                applicationId: application!.id,
                wechatUser: {
                    id: generateNewId(),
                    action: 'create',
                    data: wechatUserCreateData,
                },
                env,
            }
        }, {
            dontCollect: true,
        });
    
        return id;
    };

    const tokenId = await loginLogic();
    await loadTokenInfo<ED, Cxt>(tokenId, context);

    return tokenId;
}

/**
 * 小程序授权登录
 * @param param0 
 * @param context 
 * @returns 
 */
export async function loginWechatMp<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({ code, env }: {
    code: string;
    env: WechatMpEnv;
}, context: Cxt): Promise<string> {
    const loginLogic = async() => {
        const application = context.getApplication();
        const { type, config, systemId } = application!;
    
        assert(type === 'wechatMp' || config!.type === 'wechatMp');
        const config2 = config as WechatMpConfig;
        const { appId, appSecret } = config2;
        const wechatInstance = WechatSDK.getInstance(appId, appSecret, 'wechatMp');
    
        const { sessionKey, openId, unionId } = await wechatInstance.code2Session(code);
    
        const [wechatUser] = await context.select('wechatUser', {
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
                applicationId: application!.id,
                openId,
            }
        }, {
            dontCollect: true,
        });
    
        const id = generateNewId();
        if (wechatUser) {
            const wechatUser2 = wechatUser;
    
            const wechatUserUpdateData = {
                sessionKey,
            };
            if (unionId !== wechatUser.unionId as any) {
                Object.assign(wechatUserUpdateData, {
                    unionId,
                });
            }
            if (wechatUser2.userId) {
                // 若用户没有更换任何环境，则重用原来的token，避免token表增长过快
                const [token] = await context.select('token', {
                    data: {
                        id: 1,
                        applicationId: 1,
                        env: 1,
                    },
                    filter: {
                        applicationId: application!.id,
                        ableState: 'enabled',
                        userId: wechatUser2.userId,
                        playerId: wechatUser2.userId,
                        entity: 'wechatUser',
                        entityId: wechatUser2.id,
                    },
                }, { dummy: 1, blockTrigger: true, dontCollect: true });
                if (token && isEqual(token.env, env)) {
                    await context.operate('token', {
                        id: generateNewId(),
                        action: 'update',
                        data: {
                            wechatUser: {
                                id: generateNewId(),
                                action: 'update',
                                data: wechatUserUpdateData,
                            }
                        },
                        filter: {
                            id: token.id as string,
                        },
                    }, {
                        dontCollect: true,
                    });
                    return token.id!;
                }
    
                await context.operate('token', {
                    id: generateNewId(),
                    action: 'disable',
                    data: {
                    },
                    filter: {
                        applicationId: application!.id,
                        ableState: 'enabled',
                        userId: wechatUser2.userId,
                        playerId: wechatUser2.userId,
                    },
                }, {
                    dontCollect: true,
                });
            }
            else {
                // 创建user
                Object.assign(wechatUserUpdateData, {
                    user: {
                        id: generateNewId(),
                        action: 'create',
                        data: {
                            id: generateNewId(),
                            userState: 'normal',
                        } as CreateUser,
                    },
                });
            }
    
            await context.operate('token', {
                id: generateNewId(),
                action: 'create',
                data: {
                    id,
                    userId: wechatUser2.userId as string,
                    playerId: wechatUser2.userId as string,
                    applicationId: application!.id,
                    entity: 'wechatUser',
                    ableState: 'enabled',
                    entityId: wechatUser2.id as string,
                    wechatUser: {
                        id: generateNewId(),
                        action: 'update',
                        data: wechatUserUpdateData,
                    },
                    env
                }
            }, {
                dontCollect: true,
            });
            return id;
    
        }
        else if (unionId) {
            // 如果有unionId，查找同一个system下有没有相同的unionId
            const [wechatUser3] = await context.select('wechatUser', {
                data: {
                    id: 1,
                    userId: 1,
                    unionId: 1,
                },
                filter: {
                    application: {
                        systemId: application!.systemId,
                    },
                    unionId,
                }
            }, {
                dontCollect: true,
            });
            const wechatUser2 = wechatUser3;
            if (wechatUser2 && wechatUser2.userId) {
                await context.operate('token', {
                    id: generateNewId(),
                    action: 'disable',
                    data: {
                    },
                    filter: {
                        applicationId: application!.id,
                        ableState: 'enabled',
                        userId: wechatUser2.userId,
                        playerId: wechatUser2.userId,
                    },
                }, {
                    dontCollect: true,
                });
    
                const wechatUserCreateData: CreateWechatUser = {
                    id: generateNewId(),
                    sessionKey,
                    unionId,
                    origin: 'mp',
                    openId,
                    applicationId: application!.id!,
                    userId: wechatUser2.userId,
                };
                await context.operate('token', {
                    id: generateNewId(),
                    action: 'create',
                    data: {
                        id,
                        userId: wechatUser2.userId,
                        playerId: wechatUser2.userId,
                        applicationId: application!.id,
                        wechatUser: {
                            id: generateNewId(),
                            action: 'create',
                            data: wechatUserCreateData,
                        },
                        env,
                    }
                }, {
                    dontCollect: true,
                });
                return id;
            }
        }
    
        // 到这里都是要同时创建wechatUser和user对象了
        const userData: CreateUser = {
            id: generateNewId(),
            userState: 'normal',            
            userSystem$user: [
                {
                    id: generateNewId(),
                    action: 'create',
                    data: {
                        id: generateNewId(),
                        systemId,
                    },
                }
            ],
        };
        const wechatUserCreateData: CreateWechatUser = {
            id: generateNewId(),
            sessionKey,
            unionId,
            origin: 'mp',
            openId,
            applicationId: application!.id!,
            user: {
                id: generateNewId(),
                action: 'create',
                data: userData,
            }
        };
        await context.operate('token', {
            id: generateNewId(),
            action: 'create',
            data: {
                id,
                userId: userData.id,
                playerId: userData.id,
                applicationId: application!.id,
                wechatUser: {
                    id: generateNewId(),
                    action: 'create',
                    data: wechatUserCreateData,
                },
                env,
            }
        }, {
            dontCollect: true,
        });
    
        return id;
    };
    const tokenId = await loginLogic();
    await loadTokenInfo<ED, Cxt>(tokenId, context);
    
    return tokenId;
}

/**
 * 同步从wx.getUserProfile拿到的用户信息
 * @param param0 
 * @param context 
 */
export async function syncUserInfoWechatMp<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({
    nickname, avatarUrl, encryptedData, iv, signature
}: { nickname: string, avatarUrl: string, encryptedData: string, iv: string, signature: string }, context: Cxt) {
    const { userId } = (await context.getToken())!;
    const application = await context.getApplication();
    const [{ sessionKey, user }] = await context.select('wechatUser', {
        data: {
            id: 1,
            sessionKey: 1,
            nickname: 1,
            avatar:1,
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
            userId: userId!,
            applicationId: application!.id,
        }
    }, {
        dontCollect: true,
    });


    // console.log(avatarUrl);
    // const { type, config } = application;

    // assert(type === 'wechatMp' || config.type === 'wechatMp');
    // const config2 = config as WechatMpConfig;
    // const { appId, appSecret } = config2;
    // const wechatInstance = WechatSDK.getInstance(appId, appSecret, 'wechatMp');
    // const result = wechatInstance.decryptData(sessionKey as string, encryptedData, iv, signature);
    // 实测发现解密出来的和userInfo完全一致……
    // console.log(result);
    const { nickname: originNickname, extraFile$entity } = user as User;
    const updateData = {};
    if (nickname !== originNickname) {
        Object.assign(updateData, {
            nickname,
        });
    }
    if (extraFile$entity?.length === 0 || composeFileUrl(extraFile$entity![0]) !== avatarUrl) {
        // 需要更新新的avatar extra file
        const extraFileOperations: ExtraFileOperation['data'][] = [
            {
                id: generateNewId(),
                action: 'create',
                data: Object.assign({
                    id: generateNewId(),
                    tag1: 'avatar',
                    entity: 'user',
                    entityId: userId,
                }, decomposeFileUrl(avatarUrl))
            }
        ];
        if (extraFile$entity!.length > 0) {
            extraFileOperations.push(
                {
                    action: 'remove',
                    data: {},
                    filter: {
                        id: extraFile$entity![0].id,
                    }
                }
            );
        }
        Object.assign(updateData, {
            extraFile$entity: extraFileOperations,
        });
    }

    if (Object.keys(updateData).length > 0) {
        await context.operate('user', {
            id: generateNewId(),
            action: 'update',
            data: updateData,
            filter: {
                id: userId!,
            }
        }, {
            dontCollect: true,
        });
    }

    // todo update nickname/avatar in wechatUser
}


export async function sendCaptcha<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({ mobile, env }: {
    mobile: string;
    env: WechatMpConfig | WebEnv
}, context: Cxt): Promise<string> {
    const { type } = env;

    assert(type === 'web');
    let { visitorId } = env;
    const now = Date.now();
    if (process.env.NODE_ENV !== 'development') {
        const [count1, count2] = await Promise.all(
            [
                context.count('captcha', {
                    filter: {
                        visitorId,
                        $$createAt$$: {
                            $gt: now - 3600 * 1000,
                        },
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
                    }
                }, {
                    dontCollect: true,
                })
            ]
        );
        if (count1 > 5 || count2 > 5) {
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
        }
    }, {
        dontCollect: true,
    });
    if (captcha) {
        if (process.env.NODE_ENV === 'development') {
            const { code } = captcha;
            return `验证码[${code}]已创建`;
        }
        else if (captcha.$$createAt$$! as number - now < 60000) {
            throw new OakUserException('您的操作太迅捷啦，请稍等再点吧');
        }
        else {
            // todo 再次发送
            return '验证码已发送';
        }
    }
    else {
        let code: string;
        if (process.env.NODE_ENV === 'development') {
            code = mobile.substring(7);
        }
        else {
            code = Math.floor(Math.random() * 10000).toString();
            while (code.length < 4) {
                code += '0';
            }
        }

        const id = generateNewId();
        await context.operate('captcha', {
            id: generateNewId(),
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
        }, {
            dontCollect: true,
        });

        if (process.env.NODE_ENV === 'development') {
            return `验证码[${code}]已创建`;
        }
        else {
            return '验证码已创建';
        }
    }
}