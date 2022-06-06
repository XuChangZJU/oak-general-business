import { GeneralRuntimeContext } from '../RuntimeContext';
import { EntityDict } from 'oak-app-domain';
import { WechatSDK } from 'oak-external-sdk';
import assert from 'assert';
import { WechatMpConfig } from 'oak-app-domain/Application/Schema';
import { CreateOperationData as CreateToken, WechatMpEnv } from 'oak-app-domain/Token/Schema';
import { CreateOperationData as CreateWechatUser } from 'oak-app-domain/WechatUser/Schema';
import { CreateOperationData as CreateUser, Schema as User } from 'oak-app-domain/User/Schema';
import { Operation as ExtraFileOperation } from 'oak-app-domain/ExtraFile/Schema';
import { assign, isEqual, keys } from 'lodash';
import { SelectRowShape } from 'oak-domain/lib/types';
import { composeFileUrl, decomposeFileUrl } from '../utils/extraFile';

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
            if (token && isEqual(token.env, env)) {
                await rowStore.operate('token', {
                    action: 'update',
                    data: {
                        wechatUser: {
                            action: 'update',
                            data: wechatUserUpdateData,
                        }
                    },
                    filter: {
                        id: token.id as string,
                    },
                }, context);
                return token.id as string;
            }

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
                        userState: 'normal',
                    } as CreateUser,
                },
            });
        }

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
        const wechatUser2 = wechatUser3 as SelectRowShape<EntityDict['wechatUser']['Schema'], {
            id: 1,
            userId: 1,
            unionId: 1,
        }>;
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
        userState: 'normal',
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

/**
 * 同步从wx.getUserProfile拿到的用户信息
 * @param param0 
 * @param context 
 */
export async function syncUserInfoWechatMp<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>({
    nickname, avatarUrl, encryptedData, iv, signature
}: {nickname: string, avatarUrl: string, encryptedData: string, iv: string, signature: string}, context: Cxt) {
    const { rowStore } = context;
    const { userId } = (await context.getToken())!;
    const application = await context.getApplication();
    const { result: [{ sessionKey, user }]} = await rowStore.select('wechatUser', {
        data: {
            id: 1,
            sessionKey: 1,
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
                action: 'create',
                data: assign({
                    id: await generateNewId(),
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
        assign(updateData, {
            extraFile$entity: extraFileOperations,
        });
    }

    if (keys(updateData).length > 0) {
        await rowStore.operate('user', {
            action: 'update',
            data: updateData,
            filter: {
                id: userId!,
            }
        }, context);
    }
}

/* export type AspectDict<ED extends EntityDict> = {
    loginMp: (params: { code: string }, context: GeneralRuntimeContext<ED>) => Promise<string>;
    loginByPassword: (params: { password: string, mobile: string }, context: GeneralRuntimeContext<ED>) => Promise<string>;
};
 */