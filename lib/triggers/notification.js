"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("oak-domain/lib/utils/assert");
const oak_external_sdk_1 = require("oak-external-sdk");
const url_1 = require("oak-domain/lib/utils/domain");
const uuid_1 = require("oak-domain/lib/utils/uuid");
const sms_1 = require("../utils/sms");
const message_1 = require("./message");
const domain_1 = require("../utils/domain");
async function sendNotification(notification, context) {
    const { data, templateId, channel, messageSystemId, data1, id } = notification;
    const [messageSystem] = await context.select('messageSystem', {
        data: {
            id: 1,
            messageId: 1,
            message: {
                id: 1,
                userId: 1,
                router: 1,
                type: 1,
            },
            system: {
                id: 1,
                application$system: {
                    $entity: 'application',
                    data: {
                        id: 1,
                        type: 1,
                        config: 1,
                    },
                },
            }
        },
        filter: {
            id: messageSystemId,
        }
    }, { dontCollect: true });
    const { system, message } = messageSystem;
    const { router, userId, type } = message;
    const { application$system: applications, config } = system;
    switch (channel) {
        case 'wechatMp': {
            const app = applications.find(ele => ele.type === 'wechatMp');
            const { config } = app;
            const { appId, appSecret } = config;
            const instance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatMp', appSecret);
            let page;
            if (router) {
                const pathname = router.pathname;
                const url = pathname.startsWith('/')
                    ? `pages${pathname}/index`
                    : `pages/${pathname}/index`;
                page = (0, url_1.composeUrl)(url, Object.assign({}, router.props, router.state));
            }
            // 根据当前环境决定消息推哪个版本
            const StateDict = {
                'development': 'developer',
                'staging': 'trial',
                'production': 'former',
            };
            try {
                await instance.sendSubscribedMessage({
                    templateId: templateId,
                    data: data,
                    openId: data1.openId,
                    page,
                    state: StateDict[process.env.NODE_ENV],
                });
                await context.operate('notification', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'succeed',
                    data: {},
                    filter: {
                        id,
                    }
                }, { dontCollect: true });
                return 1;
            }
            catch (err) {
                console.warn('发微信小程序消息失败', err);
                await context.operate('notification', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'fail',
                    data: {},
                    filter: {
                        id,
                    }
                }, { dontCollect: true });
                return 1;
            }
        }
        case 'wechatPublic': {
            const app = applications.find(ele => ele.type === 'wechatPublic');
            const { config, id: applicationId } = app;
            const { appId, appSecret } = config;
            const [domain] = await context.select('domain', {
                data: {
                    id: 1,
                    url: 1,
                    apiPath: 1,
                    protocol: 1,
                    port: 1,
                },
                filter: {
                    system: {
                        application$system: {
                            id: applicationId,
                        },
                    },
                },
            }, { dontCollect: true });
            const instance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
            const { openId, wechatMpAppId } = data1;
            let page;
            // message 用户不需要跳转页面
            if (router) {
                const pathname = router.pathname;
                if (wechatMpAppId) {
                    const url = pathname.startsWith('/')
                        ? `pages${pathname}/index`
                        : `pages/${pathname}/index`;
                    page = (0, url_1.composeUrl)(url, Object.assign({}, router.props, router.state));
                }
                else {
                    const url = (0, domain_1.composeDomainUrl)(domain, pathname);
                    page = (0, url_1.composeUrl)(url, Object.assign({}, router.props, router.state));
                }
            }
            try {
                await instance.sendTemplateMessage({
                    openId,
                    templateId: templateId,
                    url: !wechatMpAppId ? page : undefined,
                    data: data,
                    miniProgram: wechatMpAppId
                        ? {
                            appid: wechatMpAppId,
                            pagepath: page,
                        }
                        : undefined,
                    clientMsgId: id,
                });
                await context.operate('notification', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'succeed',
                    data: {},
                    filter: {
                        id,
                    }
                }, { dontCollect: true });
                return 1;
            }
            catch (err) {
                console.warn('发微信公众号消息失败', err);
                await context.operate('notification', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'fail',
                    data: {},
                    filter: {
                        id,
                    }
                }, { dontCollect: true });
                return 1;
            }
        }
        default: {
            (0, assert_1.assert)(channel === 'sms');
            try {
                const result = await (0, sms_1.sendSms)({
                    messageType: type,
                    templateParam: data.params,
                    mobile: data1.mobile,
                }, context);
                if (result?.success === true) {
                    await context.operate('notification', {
                        id: await (0, uuid_1.generateNewIdAsync)(),
                        action: 'succeed',
                        data: {
                            data2: {
                                res: result?.res || {}
                            }
                        },
                        filter: {
                            id,
                        }
                    }, { dontCollect: true });
                }
                else {
                    await context.operate('notification', {
                        id: await (0, uuid_1.generateNewIdAsync)(),
                        action: 'fail',
                        data: {
                            data2: {
                                res: result?.res || {}
                            }
                        },
                        filter: {
                            id,
                        }
                    }, { dontCollect: true });
                }
            }
            catch (err) {
                await context.operate('notification', {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    action: 'fail',
                    data: {},
                    filter: {
                        id,
                    }
                }, { dontCollect: true });
                console.warn('发短信消息失败', err);
                return 1;
            }
        }
    }
}
async function tryCreateSmsNotification(message, context) {
    const smsNotification = await (0, message_1.tryMakeSmsNotification)(message, context);
    if (smsNotification) {
        const { messageSystem$message } = message;
        for (const ms of messageSystem$message) {
            const { id } = ms;
            await context.operate('notification', {
                id: await (0, uuid_1.generateNewIdAsync)(),
                action: 'create',
                data: Object.assign(smsNotification, {
                    messageSystemId: id,
                }),
            }, { dontCollect: true });
        }
        return messageSystem$message.length;
    }
    return 0;
}
const triggers = [
    {
        name: '当创建notification后，业务提交后再进行推送',
        entity: 'notification',
        action: 'create',
        when: 'commit',
        strict: 'takeEasy',
        fn: async ({ rows }, context) => {
            const closeRootMode = context.openRootMode();
            try {
                for (const row of rows) {
                    await sendNotification(row, context);
                }
            }
            catch (err) {
                closeRootMode();
                throw err;
            }
            closeRootMode();
            return 0;
        }
    },
    {
        name: '当notification完成时，根据情况去更新message',
        entity: 'notification',
        when: 'after',
        action: ['fail', 'succeed'],
        fn: async ({ operation }, context) => {
            const { filter } = operation;
            (0, assert_1.assert)(filter.id);
            const closeRootMode = context.openRootMode();
            try {
                const messages = await context.select('message', {
                    data: {
                        id: 1,
                        weight: 1,
                        iState: 1,
                        type: 1,
                        entity: 1,
                        entityId: 1,
                        userId: 1,
                        messageSystem$message: {
                            $entity: 'messageSystem',
                            data: {
                                id: 1,
                                notification$messageSystem: {
                                    $entity: 'notification',
                                    data: {
                                        id: 1,
                                        iState: 1,
                                        channel: 1,
                                    },
                                },
                            },
                        },
                    },
                    filter: {
                        messageSystem$message: {
                            notification$messageSystem: {
                                id: filter.id,
                            },
                        },
                        /* id: {
                    $in: {
                        entity: 'messageSystem',
                        data: {
                            messageId: 1,
                        },
                        filter: {
                            id: {
                                $in: {
                                    entity: 'notification',
                                    data: {
                                        messageSystemId: 1,
                                    },
                                    filter: {
                                        id: filter!.id,
                                    }
                                },
                            }
                        }
                    }
                } */
                    },
                }, { dontCollect: true });
                (0, assert_1.assert)(messages.length === 1);
                const [message] = messages;
                if (message.iState === 'success') {
                    closeRootMode();
                    return 0;
                }
                // 查看所有的notification状态，只要有一个完成就已经完成了
                let success = false;
                let allFailed = true;
                let smsTried = false;
                for (const ms of message.messageSystem$message) {
                    for (const n of ms.notification$messageSystem) {
                        if (n.iState === 'success') {
                            success = true;
                            break;
                        }
                        if (n.iState !== 'failure') {
                            allFailed = false;
                        }
                        if (n.channel === 'sms') {
                            smsTried = true;
                        }
                    }
                    if (success === true) {
                        break;
                    }
                }
                if (success) {
                    // 有一个完成就算完成
                    await context.operate('message', {
                        id: await (0, uuid_1.generateNewIdAsync)(),
                        action: 'succeed',
                        data: {},
                        filter: {
                            id: message.id,
                        },
                    }, { dontCollect: true });
                    closeRootMode();
                    return 1;
                }
                if (message.weight === 'medium' && !smsTried && allFailed) {
                    // 中级的消息，在其它途径都失败的情况下再发短信
                    const result = await tryCreateSmsNotification(message, context);
                    closeRootMode();
                    return result;
                }
                // 标识消息发送失败
                if (allFailed) {
                    await context.operate('message', {
                        id: await (0, uuid_1.generateNewIdAsync)(),
                        action: 'fail',
                        data: {},
                        filter: {
                            id: message.id,
                        },
                    }, { dontCollect: true });
                    closeRootMode();
                    return 1;
                }
            }
            catch (err) {
                closeRootMode();
                throw err;
            }
        }
    }
];
exports.default = triggers;
