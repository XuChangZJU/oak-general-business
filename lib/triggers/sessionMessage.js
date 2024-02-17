"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const uuid_1 = require("oak-domain/lib/utils/uuid");
const assert_1 = require("oak-domain/lib/utils/assert");
const WechatSDK_1 = tslib_1.__importDefault(require("oak-external-sdk/lib/WechatSDK"));
const Projection_1 = require("../types/Projection");
const constants_1 = require("../config/constants");
const triggers = [
    {
        name: '当sessionMessage创建时，发送消息到相应事件上',
        entity: 'sessionMessage',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context) => {
            const { data, id } = operation;
            (0, assert_1.assert)(!(data instanceof Array));
            const { sessionId } = data;
            (0, assert_1.assert)(sessionId);
            context.saveOperationToEvent(id, `${constants_1.DATA_SUBSCRIBER_KEYS.sessionMessageList}-${sessionId}`);
            return 1;
        },
    },
    {
        name: '当sessionMessage创建时，使其相关session更新lmts',
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
        fn: async ({ ids }, context) => {
            const closeRootMode = context.openRootMode();
            try {
                for (const id of ids) {
                    const [currentSessionMessage] = await context.select('sessionMessage', {
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
                            extraFile$entity: {
                                $entity: 'extraFile',
                                data: Projection_1.extraFileProjection,
                            },
                        },
                        filter: {
                            id,
                        },
                        count: 1,
                        indexFrom: 0,
                    }, {});
                    const { sessionId, aaoe, type, text, extraFile$entity } = currentSessionMessage;
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
                                wechatInstance = WechatSDK_1.default.getInstance(appId, type, appSecret);
                            }
                            else {
                                const { appId, appSecret } = config;
                                wechatInstance = WechatSDK_1.default.getInstance(appId, type, appSecret);
                            }
                            const openId = sessionMessage.wechatUser.openId;
                            //微信发送客服消息
                            switch (msgType) {
                                case 'text': {
                                    await wechatInstance.sendServeMessage({
                                        openId,
                                        type: msgType,
                                        content: text,
                                    });
                                    break;
                                }
                                case 'image': {
                                    const extraFile = extraFile$entity && extraFile$entity[0];
                                    if (extraFile) {
                                        const mediaId = extraFile.extra1;
                                        wechatInstance.sendServeMessage({
                                            openId,
                                            type: msgType,
                                            mediaId,
                                        });
                                    }
                                    break;
                                }
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
