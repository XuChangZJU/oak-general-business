"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryMakeSmsNotification = exports.registerMessageNotificationConverters = void 0;
const uuid_1 = require("oak-domain/lib/utils/uuid");
const assert_1 = require("oak-domain/lib/utils/assert");
const lodash_1 = require("oak-domain/lib/utils/lodash");
const ConverterDict = {};
function registerMessageNotificationConverters(converters) {
    converters.forEach(ele => {
        (0, assert_1.assert)(!ConverterDict[ele.type]);
        ConverterDict[ele.type] = ele;
    });
}
exports.registerMessageNotificationConverters = registerMessageNotificationConverters;
const InitialChannalByWeightMatrix = {
    high: ['wechatMp', 'wechatPublic', 'sms'],
    medium: ['wechatMp', 'wechatPublic'],
    low: ['wechatMp', 'wechatPublic'],
};
async function tryMakeSmsNotification(message, context) {
    const { userId, type, entity, entityId, router } = message;
    const [mobile] = await context.select('mobile', {
        data: {
            id: 1,
            mobile: 1,
        },
        filter: {
            userId,
        },
        indexFrom: 0,
        count: 1,
    }, { dontCollect: true });
    if (mobile) {
        const converter = ConverterDict[type] && ConverterDict[type].toSms;
        if (converter) {
            const dispersedData = await converter(message, context);
            if (dispersedData) {
                return {
                    id: await (0, uuid_1.generateNewIdAsync)(),
                    data: dispersedData,
                    channel: 'sms',
                    data1: mobile,
                };
            }
        }
    }
}
exports.tryMakeSmsNotification = tryMakeSmsNotification;
async function createNotification(message, context) {
    const { restriction, userId, weight, type, entity, entityId, platformId, channels } = message;
    (0, assert_1.assert)(userId);
    // 根据用户所关联的system和定义限制，选择将要发送的system。这里有的应用是到platform级别，有的是到system级别
    const filter = {
        userId,
    };
    if (platformId) {
        filter.system = {
            platformId,
        };
    }
    const userSystems = await context.select('userSystem', {
        data: {
            id: 1,
            system: {
                id: 1,
                config: 1,
                application$system: {
                    $entity: 'application',
                    data: {
                        id: 1,
                        type: 1,
                        config: 1,
                    },
                },
            },
        },
        filter,
    }, { dontCollect: true });
    // 这里实测线上跑出来多条相同的userSystem，还未知道原因 by Xc 20230317
    const systems = (0, lodash_1.uniqBy)(userSystems.map(ele => ele.system).filter(ele => {
        if (restriction && restriction.systemIds) {
            return restriction.systemIds.includes(ele.id);
        }
        return true;
    }), 'id');
    if (systems.length === 0) {
        console.warn(`类型为${type}的消息在生成时，尝试为之生成通知，找不到可推送的system`);
        return 0;
    }
    const messageTypeTemplates = await context.select('messageTypeTemplate', {
        data: {
            id: 1,
            templateId: 1,
            template: {
                id: 1,
                wechatId: 1,
                applicationId: 1,
            },
            type: 1,
        },
        filter: {
            type,
            template: {
                application: {
                    systemId: {
                        $in: systems.map(ele => ele.id),
                    },
                },
            },
        },
    }, { dontCollect: true });
    // 根据定义所限制的渠道和weight，计算出相应的推送渠道
    const channels2 = ((channels && channels.length > 0) ? channels : InitialChannalByWeightMatrix[weight]).filter(ele => {
        if (restriction && restriction.channels) {
            return restriction.channels.includes(ele);
        }
        return true;
    });
    /* if (channels.length === 0) {
        console.warn(`类型为${type}的消息在生成时，尝试为之生成通知，找不到可推送的channel`);
        return 0;
    } */
    // 逐system逐channel去构造messageSystem和messageSent数据
    let messageSentCount = 0;
    const messageSystemDatas = [];
    await Promise.all(systems.map(async (system) => {
        const { application$system: applications, config } = system;
        const notificationDatas = [];
        await Promise.all(channels2.map(async (channel) => {
            switch (channel) {
                case 'wechatMp': {
                    const apps = applications.filter(ele => ele.type === 'wechatMp');
                    const wechatUsers = await context.select('wechatUser', {
                        data: {
                            id: 1,
                            applicationId: 1,
                            openId: 1,
                        },
                        filter: {
                            applicationId: {
                                $in: apps.map(ele => ele.id),
                            },
                            userId,
                        }
                    }, { dontCollect: true });
                    for (const app of apps) {
                        // 如果是wechatMp或者wechat，还要保证用户已经有openId
                        const wechatUser = wechatUsers.find(ele => ele.applicationId === app.id);
                        const messageTypeTemplate = messageTypeTemplates.find(ele => ele.template.applicationId === app.id && ele.type === type);
                        if (messageTypeTemplate && wechatUser) {
                            const converter = ConverterDict[type] && ConverterDict[type].toWechatMp;
                            const dispersedData = converter && await converter(entity, entityId, apps, app, context);
                            if (dispersedData) {
                                notificationDatas.push({
                                    id: await (0, uuid_1.generateNewIdAsync)(),
                                    data: dispersedData,
                                    channel,
                                    applicationId: app.id,
                                    templateId: messageTypeTemplate.template.wechatId,
                                    data1: {
                                        openId: wechatUser.openId,
                                    }
                                });
                            }
                        }
                    }
                    break;
                }
                case 'wechatPublic': {
                    const apps = applications.filter(ele => ele.type === 'wechatPublic');
                    const [user] = await context.select('user', {
                        data: {
                            id: 1,
                            refId: 1,
                        },
                        filter: {
                            id: userId
                        }
                    }, { dontCollect: true });
                    const userIds = user.refId ? [userId, user.refId] : [userId];
                    const wechatUsers = await context.select('wechatUser', {
                        data: {
                            id: 1,
                            applicationId: 1,
                            openId: 1,
                        },
                        filter: {
                            applicationId: {
                                $in: apps.map((ele) => ele.id),
                            },
                            userId: {
                                $in: userIds
                            },
                        },
                    }, { dontCollect: true });
                    for (const app of apps) {
                        // 如果是wechatMp或者wechat，还要保证用户已经有openId
                        const wechatUser = wechatUsers.find(ele => ele.applicationId === app.id);
                        const messageTypeTemplate = messageTypeTemplates.find(ele => ele.template.applicationId === app.id && ele.type === type);
                        if (messageTypeTemplate && wechatUser) {
                            const converter = ConverterDict[type] && ConverterDict[type].toWechatPublic;
                            const disperseResult = converter && await converter(entity, entityId, apps, app, context);
                            if (disperseResult) {
                                const { data, wechatMpAppId } = disperseResult;
                                notificationDatas.push({
                                    id: await (0, uuid_1.generateNewIdAsync)(),
                                    data,
                                    channel,
                                    applicationId: app.id,
                                    templateId: messageTypeTemplate.template.wechatId,
                                    data1: {
                                        openId: wechatUser.openId,
                                        wechatMpAppId,
                                    }
                                });
                            }
                        }
                    }
                    break;
                }
                default: {
                    (0, assert_1.assert)(channel === 'sms'); // 目前只支持三种
                    break;
                }
            }
        }));
        if (channels2.includes('sms')) {
            const smsNotification = await tryMakeSmsNotification(message, context);
            if (smsNotification) {
                notificationDatas.push(smsNotification);
            }
        }
        const messageSystemData = {
            id: await (0, uuid_1.generateNewIdAsync)(),
            messageId: message.id,
            systemId: system.id,
        };
        if (notificationDatas.length > 0) {
            messageSentCount += notificationDatas.length;
            messageSystemData.notification$messageSystem = {
                id: await (0, uuid_1.generateNewIdAsync)(),
                action: 'create',
                data: notificationDatas,
            };
        }
        messageSystemDatas.push(messageSystemData);
    }));
    if (messageSystemDatas.length > 0) {
        message.messageSystem$message = {
            id: await (0, uuid_1.generateNewIdAsync)(),
            action: 'create',
            data: messageSystemDatas,
        };
    }
    message.iState = messageSentCount ? 'sending' : 'failure';
    return messageSentCount;
}
const triggers = [
    {
        name: '当创建message时，创建相应的通知数据',
        entity: 'message',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data } = operation;
            let count = 0;
            const closeRootMode = context.openRootMode();
            try {
                if (data instanceof Array) {
                    for (const d of data) {
                        count += await createNotification(d, context);
                    }
                }
                else {
                    count = await createNotification(data, context);
                }
            }
            catch (err) {
                closeRootMode();
                throw err;
            }
            closeRootMode();
            return count;
        }
    },
];
exports.default = triggers;
