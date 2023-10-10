import { EntityDict } from "../oak-app-domain";
import { AppType, WechatPublicConfig } from "../oak-app-domain/Application/Schema";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { OakUserException } from 'oak-domain/lib/types';
import { WechatPublicEventData, WechatMpEventData } from 'oak-external-sdk';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import assert from "assert";
// export async function transformData<
//     ED extends EntityDict,
//     Cxt extends BackendRuntimeContext<ED>
// >(
//     params: {
//         data: WechatPublicEventData | WechatMpEventData;
//         type: AppType,
//         entity: string,
//         entityId: string,
//     },
//     context: Cxt
// ) {
//     const { data, type, entity, entityId } = params;
//     const {
//         ToUserName,
//         FromUserName,
//         CreateTime,
//         MsgType,
//         // Event,
//         Content,
//         // EventKey,
//     } = data;
//     if (entity !== 'web') {
//         const sessionMessageData = {
//             createTime: CreateTime,
//             type: MsgType,
//             text: Content,
//             // news: ,
//             aaoe: false,
//             isRead: false,
//         }
//         return sessionMessageData
//     } else {
//         const sessionMessageData = {
//             createTime: CreateTime,
//             type: MsgType,
//             text: Content,
//             // news: ,
//             aaoe: false,
//             isRead: false,
//         }
//         return sessionMessageData
//     }

// }
export async function createSession<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        data?: WechatPublicEventData | WechatMpEventData;
        type: AppType,
        entity?: string,
        entityId?: string,
    },
    context: Cxt
) {
    const { data, type, entity, entityId } = params;
    const userId = context.getCurrentUserId(true);


    let session;
    let sessionMessage$session
    switch (type) {
        case 'web': {
            const systemId = context.getSystemId();

            const [application] = await context.select('application', {
                data: {
                    id: 1,
                    systemId: 1,
                    type: 1,
                },
                filter: {
                    systemId,
                    type: 'web'
                }
            }, {});
            const result = await context.select('session', {
                data: {
                    id: 1,
                    entity: 1,
                    entityId: 1,
                    userId: 1,
                    lmts: 1,
                },
                filter: {
                    entity: entity || 'application',
                    entityId: entityId || application?.id,
                    userId,
                }
            }, {});
            session = result[0]
            break;
        }
        case 'wechatMp':
        case 'wechatPublic': {
            assert(data);
            assert(entity === 'application');
            const {
                ToUserName,
                FromUserName,
                CreateTime,
                MsgType,
                // Event,
                Content,
                // EventKey,
            } = data;
            const [wechatUser] = await context.select('wechatUser', {
                data: {
                    id: 1,
                    openId: 1,
                    applicationId: 1,
                },
                filter: {
                    openId: FromUserName,
                }
            }, {});
            const result = await context.select('session', {
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
                }
            }, {});
            session = result[0]
            sessionMessage$session = [
                {
                    id: await generateNewIdAsync(),
                    action: 'create',
                    data: {
                        id: await generateNewIdAsync(),
                        applicationId: wechatUser?.applicationId,
                        wechatUserId: wechatUser?.id,
                        createTime: CreateTime,
                        type: MsgType,
                        text: Content,
                        // news: ,
                        aaoe: false,
                    },
                }

            ]
            break;
        }
        default: {
            assert(false, '')
        }

    }
    const sessionId = await generateNewIdAsync();
    if (session) {
        if (!data) {
            return session.id
        }
        await context.operate('session', {
            id: await generateNewIdAsync(),
            action: 'update',
            data: Object.assign({
            }, sessionMessage$session && { sessionMessage$session }),
            filter: {
                id: session.id,
            }
        }, {
            dontCollect: true,
        });
        return session.id
    }
    else {

        await context.operate('session', {
            id: await generateNewIdAsync(),
            action: 'create',
            data: Object.assign({
                id: sessionId,
                entity,
                entityId,
                userId,
                lmts: Date.now(),
                openId: data?.FromUserName,
            }, sessionMessage$session && { sessionMessage$session }),
        }, {
            dontCollect: true,
        });
        return sessionId
    }
}
