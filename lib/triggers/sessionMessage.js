"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("oak-domain/lib/utils/uuid");
const assert_1 = require("oak-domain/lib/utils/assert");
const oak_external_sdk_1 = require("oak-external-sdk");
const triggers = [
    {
        name: '当sessionMessage创建时时，使其相关session更新lmts',
        entity: 'sessionMessage',
        action: 'create',
        when: 'after',
        fn: async (event, context) => {
            const { operation: { data }, } = event;
            const { sessionId, type, text, } = data;
            const closeRootMode = context.openRootMode();
            const messageType = type;
            try {
                await context.operate('session', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'update',
                    data: {
                        lmts: Date.now(),
                    },
                    filter: {
                        id: sessionId,
                    },
                }, {});
                const [sessionMessage] = await context.select('sessionMessage', {
                    data: {
                        id: 1,
                        sessionId: 1,
                        text: 1,
                        type: 1,
                        userId: 1,
                        wechatUserId: 1,
                        wechatUser: {
                            id: 1,
                            openId: 1,
                        },
                        applicationId: 1,
                        createTime: 1,
                        $$createAt$$: 1,
                        aaoe: 1,
                    },
                    filter: {
                        id: sessionId,
                        aaoe: false,
                        createTime: {
                            $gt: Date.now() - (48 * 60 * 60 * 1000 - 5 * 60 * 1000)
                        }
                    },
                    sorter: [
                        {
                            $attr: {
                                createTime: 1,
                            },
                            $direction: 'desc',
                        },
                    ],
                    count: 1,
                    indexFrom: 0,
                }, {});
                if (sessionMessage && sessionMessage.wechatUserId) {
                    const [session] = await context.select('session', {
                        data: {
                            id: 1,
                            entity: 1,
                            entityId: 1,
                            userId: 1,
                            openId: 1,
                        },
                        filter: {
                            id: sessionId,
                        },
                    }, {});
                    const [application] = await context.select('application', {
                        data: {
                            id: 1,
                            type: 1,
                            config: 1,
                            systemId: 1,
                        },
                        filter: {
                            id: session.entityId,
                        },
                    }, {});
                    const { type, config, systemId } = application;
                    (0, assert_1.assert)(type === 'wechatPublic');
                    const { appId, appSecret } = config;
                    const wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
                    function sendMessage() {
                        switch (messageType) {
                            case 'text': {
                                wechatInstance.sendServeMessage({
                                    openId: sessionMessage.wechatUser?.openId,
                                    type: messageType,
                                    content: text,
                                });
                                break;
                            }
                            default: {
                                (0, assert_1.assert)(false, '你所发送的消息类型不支持');
                            }
                            //todo
                            // case 'image' :{
                            //     wechatInstance.sendServeMessage({
                            //         openId: sessionMessage.wechatUser?.openId!,
                            //         type: messageType,
                            //         mediaId: '',
                            //     });
                            //     break;
                            // }
                        }
                    }
                    sendMessage();
                }
            }
            catch (err) {
                closeRootMode();
                throw err;
            }
            closeRootMode();
            return 1;
        },
    },
];
exports.default = triggers;
