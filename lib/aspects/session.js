"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = void 0;
const tslib_1 = require("tslib");
const uuid_1 = require("oak-domain/lib/utils/uuid");
const assert_1 = tslib_1.__importDefault(require("assert"));
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
async function createSession(params, context) {
    const { data, type, entity, entityId } = params;
    const userId = context.getCurrentUserId(true);
    let session;
    let sessionMessage$session;
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
            session = result[0];
            break;
        }
        case 'wechatMp':
        case 'wechatPublic': {
            (0, assert_1.default)(data, '');
            const { ToUserName, FromUserName, CreateTime, MsgType, 
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
            sessionMessage$session = [
                {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'create',
                    data: {
                        id: await (0, uuid_1.generateNewIdAsync)(),
                        applicationId: wechatUser?.applicationId,
                        // sessionId: session[0]?.id,
                        wechatUser: wechatUser?.id,
                        createTime: CreateTime,
                        type: MsgType,
                        text: Content,
                        // news: ,
                        aaoe: false,
                    },
                }
            ];
            break;
        }
        default: {
            (0, assert_1.default)(false, '');
        }
    }
    const sessionId = await (0, uuid_1.generateNewIdAsync)();
    if (session) {
        if (!data) {
            return session.id;
        }
        await context.operate('session', {
            id: await (0, uuid_1.generateNewIdAsync)(),
            action: 'update',
            data: Object.assign({}, sessionMessage$session && { sessionMessage$session }),
            filter: {
                id: session.id,
            }
        }, {
            dontCollect: true,
        });
        return session.id;
    }
    else {
        await context.operate('session', {
            id: await (0, uuid_1.generateNewIdAsync)(),
            action: 'create',
            data: Object.assign({
                id: sessionId,
                entity,
                entityId,
                userId,
                lmts: Date.now(),
            }, sessionMessage$session && { sessionMessage$session }),
        }, {
            dontCollect: true,
        });
        return sessionId;
    }
}
exports.createSession = createSession;
