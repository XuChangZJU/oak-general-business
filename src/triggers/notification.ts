import { Trigger, CreateTrigger, UpdateTrigger, UpdateTriggerInTxn } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { CreateOperationData as CreateNotificationData } from '../general-app-domain/Notification/Schema';
import { assert } from 'oak-domain/lib/utils/assert';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { WechatMpConfig, WechatPublicConfig, WebConfig } from '../general-app-domain/Application/Schema';
import { WechatMpInstance, WechatPublicInstance, WechatSDK } from 'oak-external-sdk';
import { composeUrl } from 'oak-domain/lib/utils/url';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { sendSms } from '../utils/sms';
import { tryMakeSmsNotification } from './message';
import { composeDomainUrl } from '../utils/domain';

async function sendMessage(notification: CreateNotificationData, context: BackendRuntimeContext<EntityDict>) {
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
    const { system, message } = messageSystem!;
    const { router, userId, type } = message!;
    const { application$system: applications, config } = system!;
    switch (channel) {
        case 'wechatMp': {
            const app = applications!.find(
                ele => ele.type === 'wechatMp'
            );
            const { config } = app!;
            const { appId, appSecret } = config as WechatMpConfig;
            const instance = WechatSDK.getInstance(appId!, 'wechatMp', appSecret) as WechatMpInstance;
            const page = `/pages/${composeUrl(router!.pathname!, Object.assign({}, router!.props!, router!.state!))}`;

            // 根据当前环境决定消息推哪个版本
            const StateDict = {
                'development': 'developer',
                'staging': 'trial',
                'production': 'former',
            }
            try {
                await instance.sendSubscribedMessage({
                    templateId: templateId!,
                    data: data!,
                    openId: (data1 as { openId: string }).openId,   // 在notification创建时就赋值了
                    page,
                    state: StateDict[process.env.NODE_ENV as 'development'] as 'developer',
                });
                await context.operate('notification', {
                    id: await generateNewIdAsync(),
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
                    id: await generateNewIdAsync(),
                    action: 'fail',
                    data: {
                    },
                    filter: {
                        id,
                    }
                }, { dontCollect: true });
                return 1;
            }
        }
        case 'wechatPublic': {
            const app = applications!.find(
                ele => ele.type === 'wechatPublic'
            );
            const { config, id: applicationId } = app!;
            const { appId, appSecret } = config as WechatPublicConfig;
            const [domain] = await context.select(
                'domain',
                {
                    data: {
                        id: 1,
                        url: 1,
                        apiPath: 1,
                        protocol: 1,
                        port: 1,
                    },
                    filter: {
                        systemId: {
                            $in: {
                                entity: 'application',
                                data: {
                                    systemId: 1,
                                },
                                filter: {
                                    id: applicationId,
                                },
                            },
                        },
                    },
                },
                { dontCollect: true }
            );
            const instance = WechatSDK.getInstance(appId!, 'wechatPublic', appSecret) as WechatPublicInstance;
            const { openId, wechatMpAppId } = data1 as {
                openId: string,
                wechatMpAppId?: string,
            };

            let page;
            // message 用户不需要跳转页面
            if (router) {
                const url = wechatMpAppId
                    ? router.pathname!
                    : composeDomainUrl(
                          domain as EntityDict['domain']['Schema'],
                          router.pathname!
                      );
                page = composeUrl(
                    url,
                    Object.assign({}, router!.props!, router!.state!)
                );
                if (wechatMpAppId) {
                    page = page.startsWith('/')
                        ? `/pages${page}`
                        : `/pages/${page}`;
                }
            }
         


            try {
                await instance.sendTemplateMessage({
                    openId,
                    templateId: templateId!,
                    url: !wechatMpAppId ? page : undefined,
                    data: data!,
                    miniProgram: wechatMpAppId
                        ? {
                              appid: wechatMpAppId,
                              pagepath: page as string,
                          }
                        : undefined,
                    clientMsgId: id,
                });
                await context.operate('notification', {
                    id: await generateNewIdAsync(),
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
                    id: await generateNewIdAsync(),
                    action: 'fail',
                    data: {
                    },
                    filter: {
                        id,
                    }
                }, { dontCollect: true });
                return 1;
            }
        }
        default: {
            assert(channel === 'sms');

            try {
                await sendSms({
                    origin: 'ali',
                    templateName: type,
                    templateParamSet: (data as { params: any }).params!,
                    mobile: (data1 as { mobile: string }).mobile,
                }, context);
                await context.operate('notification', {
                    id: await generateNewIdAsync(),
                    action: 'succeed',
                    data: {},
                    filter: {
                        id,
                    }
                }, { dontCollect: true });
                return 1;
            }
            catch (err) {
                console.warn('发tencent sms消息失败', err);
                try {
                    await sendSms({
                        origin: 'tencent',
                        templateName: type,
                        templateParamSet: (data as { paramsArray: any }).paramsArray!,
                        mobile: (data1 as { mobile: string }).mobile,
                    }, context);
                    await context.operate('notification', {
                        id: await generateNewIdAsync(),
                        action: 'succeed',
                        data: {},
                        filter: {
                            id,
                        }
                    }, { dontCollect: true });
                    return 1;
                }
                catch (err2) {
                    console.warn('发aliyun sms消息失败', err2);
                    await context.operate('notification', {
                        id: await generateNewIdAsync(),
                        action: 'fail',
                        data: {
                        },
                        filter: {
                            id,
                        }
                    }, { dontCollect: true });
                    return 1;
                }
            }
        }
    }
}

async function tryCreateSmsNotification(message: EntityDict['message']['Schema'], context: BackendRuntimeContext<EntityDict>) {
    const smsNotification = await tryMakeSmsNotification(message, context);
    if (smsNotification) {
        const { messageSystem$message } = message;
        for (const ms of messageSystem$message!) {
            const { id } = ms;
            await context.operate('notification', {
                id: await generateNewIdAsync(),
                action: 'create',
                data: Object.assign(smsNotification, {
                    messageSystemId: id,
                }),
            }, { dontCollect: true });
        }
        return messageSystem$message!.length;
    }
    return 0;
}

const triggers: Trigger<EntityDict, 'notification', BackendRuntimeContext<EntityDict>>[] = [
    {
        name: '当创建notification后，业务提交后再进行推送',
        entity: 'notification',
        action: 'create',
        when: 'commit',
        strict: 'takeEasy',
        fn: async ({ operation }, context) => {
            const { data } = operation;
            if (data instanceof Array) {
                for (const d of data) {
                    await sendMessage(d, context);
                }
            }
            else {
                await sendMessage(data, context);
            }
            return 0;
        }
    } as CreateTrigger<EntityDict, 'notification', BackendRuntimeContext<EntityDict>>,
    {
        name: '当notification完成时，根据情况去更新message',
        entity: 'notification',
        when: 'after',
        action: ['fail', 'succeed'],
        fn: async ({ operation }, context) => {
            const { filter } = operation;
            assert(filter!.id);
            const [message] = await context.select('message', {
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
                }
            }, { dontCollect: true });
            assert(message);
            if (message.iState === 'success') {
                return 0;
            }

            // 查看所有的notification状态，只要有一个完成就已经完成了
            let success = false;
            let allFailed = true;
            let smsTried = false;
            for (const ms of message.messageSystem$message!) {
                for (const n of ms.notification$messageSystem!) {
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
                    id: await generateNewIdAsync(),
                    action: 'succeed',
                    data: {},
                    filter: {
                        id: message.id,
                    },
                }, { dontCollect: true });
                return 1;
            }

            if (message.weight === 'medium' && !smsTried && allFailed) {
                // 中级的消息，在其它途径都失败的情况下再发短信
                const result = await tryCreateSmsNotification(message as EntityDict['message']['Schema'], context);
                return result;
            }
            // 标识消息发送失败
            await context.operate('message', {
                id: await generateNewIdAsync(),
                action: 'fail',
                data: {},
                filter: {
                    id: message.id,
                },
            }, { dontCollect: true });
            return 1;
        }
    } as UpdateTriggerInTxn<EntityDict, 'notification', BackendRuntimeContext<EntityDict>>
];
export default triggers;