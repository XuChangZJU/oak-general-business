"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = void 0;
const uuid_1 = require("oak-domain/lib/utils/uuid");
const assert_1 = require("oak-domain/lib/utils/assert");
async function createSession(params, context) {
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
                    const [application] = await context.select('application', {
                        data: {
                            id: 1,
                            systemId: 1,
                            type: 1,
                        },
                        filter: {
                            systemId,
                            type: 'web',
                        },
                    }, {});
                    entity2 = 'application';
                    entityId2 = application?.id;
                }
                (0, assert_1.assert)(entity2 && entityId2);
                const result = await context.select('session', {
                    data: {
                        id: 1,
                        entity: 1,
                        entityId: 1,
                        userId: 1,
                        lmts: 1,
                    },
                    filter: {
                        entity: entity2,
                        entityId: entityId2,
                        userId,
                    },
                }, {});
                session = result[0];
                break;
            }
            case 'wechatMp':
            case 'wechatPublic': {
                (0, assert_1.assert)(data);
                (0, assert_1.assert)(entity === 'application' && entityId);
                const { ToUserName, FromUserName, CreateTime, MsgType, Content, } = data;
                const [wechatUser] = await context.select('wechatUser', {
                    data: {
                        id: 1,
                        openId: 1,
                        applicationId: 1,
                    },
                    filter: {
                        openId: FromUserName,
                    },
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
                    },
                }, {});
                session = result[0];
                sessionMessage$session = [
                    {
                        id: await (0, uuid_1.generateNewIdAsync)(),
                        action: 'create',
                        data: {
                            id: await (0, uuid_1.generateNewIdAsync)(),
                            applicationId: wechatUser?.applicationId,
                            wechatUserId: wechatUser?.id,
                            createTime: Number(CreateTime) * 1000,
                            type: MsgType,
                            text: Content,
                            aaoe: false,
                        },
                    },
                ];
                if (MsgType === 'image') {
                }
                else if (MsgType === 'video') {
                }
                else if (MsgType === 'voice') {
                }
                break;
            }
            default: {
                (0, assert_1.assert)(false, `传入不支持的type: ${type}`);
            }
        }
        if (session) {
            if (!sessionMessage$session) {
                closeRootMode();
                return session.id;
            }
            await context.operate('session', {
                id: await (0, uuid_1.generateNewIdAsync)(),
                action: 'update',
                data: {
                    sessionMessage$session,
                },
                filter: {
                    id: session.id,
                },
            }, {
                dontCollect: true,
            });
            closeRootMode();
            return session.id;
        }
        else {
            const sessionId = await (0, uuid_1.generateNewIdAsync)();
            await context.operate('session', {
                id: await (0, uuid_1.generateNewIdAsync)(),
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
            closeRootMode();
            return sessionId;
        }
    }
    catch (e) {
        closeRootMode();
        throw e;
    }
}
exports.createSession = createSession;
