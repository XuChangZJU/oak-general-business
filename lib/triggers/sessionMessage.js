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
            const { sessionId } = data;
            const closeRootMode = context.openRootMode();
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
            }
            catch (err) {
                closeRootMode();
                throw err;
            }
            closeRootMode();
            return 1;
        },
    },
    {
        name: '当创建sessionMessage后，业务提交后再进行推送',
        entity: 'sessionMessage',
        action: 'create',
        when: 'commit',
        strict: 'takeEasy',
        fn: async ({ rows }, context) => {
            const closeRootMode = context.openRootMode();
            try {
                for (const row of rows) {
                    const { sessionId, aaoe, type, text } = row;
                    if (aaoe) {
                        const msgType = type;
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
                                sessionId,
                                aaoe: false,
                                createTime: {
                                    $gt: Date.now() -
                                        (48 * 60 * 60 * 1000 -
                                            5 * 60 * 1000),
                                },
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
                            const { type, config } = application;
                            (0, assert_1.assert)(type === 'wechatPublic' || type === 'wechatMp');
                            let wechatInstance;
                            if (type === 'wechatMp') {
                                const { appId, appSecret } = config;
                                wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
                            }
                            else {
                                const { appId, appSecret } = config;
                                wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, type, appSecret);
                            }
                            //微信发送客服消息
                            switch (msgType) {
                                case 'text': {
                                    wechatInstance.sendServeMessage({
                                        openId: sessionMessage.wechatUser
                                            ?.openId,
                                        type: msgType,
                                        content: text,
                                    });
                                    break;
                                }
                                // case 'image' :{
                                //     wechatInstance.sendServeMessage({
                                //         openId: sessionMessage.wechatUser?.openId!,
                                //         type: msgType,
                                //         mediaId: '',
                                //     });
                                //     break;
                                // }
                                default: {
                                    (0, assert_1.assert)(false, `消息类型「${msgType}」尚未支持`);
                                }
                            }
                        }
                    }
                }
            }
            catch (err) {
                closeRootMode();
                throw err;
            }
            closeRootMode();
            return 0;
        },
    },
];
exports.default = triggers;
