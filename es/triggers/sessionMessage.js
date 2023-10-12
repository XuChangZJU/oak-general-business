import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { assert } from 'oak-domain/lib/utils/assert';
import { WechatSDK, } from 'oak-external-sdk';
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
                    id: await generateNewIdAsync(),
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
                        sessionId,
                        aaoe: false,
                        createTime: {
                            $gt: Date.now() -
                                (48 * 60 * 60 * 1000 - 5 * 60 * 1000),
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
                    assert(type === 'wechatPublic' || type === 'wechatMp');
                    let wechatInstance;
                    if (type === 'wechatMp') {
                        const { appId, appSecret } = config;
                        wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
                    }
                    else {
                        const { appId, appSecret } = config;
                        wechatInstance = WechatSDK.getInstance(appId, type, appSecret);
                    }
                    //微信发送客服消息
                    switch (messageType) {
                        case 'text': {
                            wechatInstance.sendServeMessage({
                                openId: sessionMessage.wechatUser?.openId,
                                type: messageType,
                                content: text,
                            });
                            break;
                        }
                        // case 'image' :{
                        //     wechatInstance.sendServeMessage({
                        //         openId: sessionMessage.wechatUser?.openId!,
                        //         type: messageType,
                        //         mediaId: '',
                        //     });
                        //     break;
                        // }
                        default: {
                            assert(false, `消息类型「${messageType}」尚未支持`);
                        }
                    }
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
export default triggers;
