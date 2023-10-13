import { EntityDict } from '../oak-app-domain';
import {
    AppType,
    WechatPublicConfig,
} from '../oak-app-domain/Application/Schema';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { OakUserException } from 'oak-domain/lib/types';
import { WechatPublicEventData, WechatMpEventData } from 'oak-external-sdk';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { assert } from 'oak-domain/lib/utils/assert';

export async function createSession<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        data?: WechatPublicEventData | WechatMpEventData;
        type: AppType;
        entity?: string;
        entityId?: string;
    },
    context: Cxt
) {
    const { data, type, entity, entityId } = params;
    const userId = context.getCurrentUserId(true);
    const closeRootMode = context.openRootMode();

    try {
        let session;
        let sessionMessage$session;
        switch (type) {
            case 'web': {
                const systemId = context.getSystemId();

                let entity2 = entity;
                let entityId2 = entityId;
                if (!entity) {
                    // 默认
                    const [application] = await context.select(
                        'application',
                        {
                            data: {
                                id: 1,
                                systemId: 1,
                                type: 1,
                            },
                            filter: {
                                systemId,
                                type: 'web',
                            },
                        },
                        {}
                    );
                    entity2 = 'application';
                    entityId2 = application?.id;
                }
                assert(entity2 && entityId2);
                const result = await context.select(
                    'session',
                    {
                        data: {
                            id: 1,
                            entity: 1,
                            entityId: 1,
                            userId: 1,
                            lmts: 1,
                        },
                        filter: {
                            entity: entity2!,
                            entityId: entityId2!,
                            userId,
                        },
                    },
                    {}
                );
                session = result[0];
                break;
            }
            case 'wechatMp':
            case 'wechatPublic': {
                assert(data);
                assert(entity === 'application' && entityId);
                const {
                    ToUserName,
                    FromUserName,
                    CreateTime,
                    MsgType,
                    Content,
                } = data;
                const [wechatUser] = await context.select(
                    'wechatUser',
                    {
                        data: {
                            id: 1,
                            openId: 1,
                            applicationId: 1,
                        },
                        filter: {
                            openId: FromUserName,
                        },
                    },
                    {}
                );
                const result = await context.select(
                    'session',
                    {
                        data: {
                            id: 1,
                            entity: 1,
                            entityId: 1,
                            userId: 1,
                            lmts: 1,
                            openId: 1,
                        },
                        filter: {
                            entity: entity,
                            entityId: entityId,
                            openId: FromUserName,
                        },
                    },
                    {}
                );
                session = result[0];
                sessionMessage$session = [
                    {
                        id: await generateNewIdAsync(),
                        action: 'create',
                        data: {
                            id: await generateNewIdAsync(),
                            applicationId: wechatUser?.applicationId,
                            wechatUserId: wechatUser?.id,
                            createTime: Number(CreateTime) * 1000,
                            type: MsgType,
                            text: Content,
                            aaoe: false,
                        },
                    },
                ];
                break;
            }
            default: {
                assert(false, `传入不支持的type: ${type}`);
            }
        }
        if (session) {
            if (!sessionMessage$session) {
                closeRootMode();
                return session.id;
            }
            await context.operate(
                'session',
                {
                    id: await generateNewIdAsync(),
                    action: 'update',
                    data: {
                        sessionMessage$session,
                    },
                    filter: {
                        id: session.id,
                    },
                },
                {
                    dontCollect: true,
                }
            );
            closeRootMode();
            return session.id;
        } else {
            const sessionId = await generateNewIdAsync();
            await context.operate(
                'session',
                {
                    id: await generateNewIdAsync(),
                    action: 'create',
                    data: Object.assign(
                        {
                            id: sessionId,
                            entity,
                            entityId,
                            userId,
                            lmts: Date.now(),
                            openId: data?.FromUserName,
                        },
                        sessionMessage$session && { sessionMessage$session }
                    ),
                },
                {
                    dontCollect: true,
                }
            );
            closeRootMode();
            return sessionId;
        }
    } catch (e) {
        closeRootMode();
        throw e;
    }
}
