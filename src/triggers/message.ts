import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { Trigger, CreateTrigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { CreateOperationData as CreateMessageData } from '../general-app-domain/Message/Schema';
import { assert } from 'oak-domain/lib/utils/assert';
import { BRC } from '../types/RuntimeCxt';
import { Channel, MessageNotificationConverter, Weight } from '../types/Message';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';

const ConverterDict: Record<string, MessageNotificationConverter<EntityDict, BRC>> = {}

export function registerMessageNotificationConverters<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(converters: MessageNotificationConverter<ED, Cxt>[]) {
    converters.forEach(
        ele => {
            assert(!ConverterDict[ele.type]);
            (ConverterDict as Record<string, MessageNotificationConverter<ED, Cxt>>)[ele.type] = ele;
        }
    );
}


const InitialChannalByWeightMatrix: Record<Weight, Channel[]> = {
    high: ['mp', 'wechatPublic', 'sms'],
    medium: ['mp', 'wechatPublic'],
    low: ['mp', 'wechatPublic'],
};

async function createNotification(message: CreateMessageData, context: BRC) {
    const { restriction, userId, weight, type, entity, entityId } = message;
    assert(userId);

    // 根据用户所关联的system和定义限制，选择将要发送的system。一般来说不可能跨platform
    const application = context.getApplication();
    const platformId = application!.system!.platformId!;
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
        filter: {
            userId,
            system: {
                platformId,
            }
        },
    }, { dontCollect: true });

    const systems = userSystems.map(
        ele => ele.system!
    ).filter(
        ele => {
            if (restriction && restriction.systemIds) {
                return restriction.systemIds.includes(ele.id);
            }
            return true;
        }
    );

    if (systems.length === 0) {
        console.warn(`类型为${type}的消息在生成时，尝试为之生成通知，找不到可推送的system`);
        return 0;
    }

    const messageTypeTemplateIds = await context.select('messageTypeTemplateId', {
        data: {
            id: 1,
            templateId: 1,
            applicationId: 1,
            type: 1,
        },
        filter: {
            type,
            application: {
                systemId: {
                    $in: systems.map(
                        ele => ele.id,
                    ),
                },
            },
        },
    }, { dontCollect: true });

    // 根据定义所限制的渠道和weight，计算出相应的推送渠道
    const channels = InitialChannalByWeightMatrix[weight!].filter(
        ele => {
            if (restriction && restriction.channels) {
                return restriction.channels.includes(ele);
            }
            return true;
        }
    );
    
    if (channels.length === 0) {
        console.warn(`类型为${type}的消息在生成时，尝试为之生成通知，找不到可推送的channel`);
        return 0;
    }

    // 逐system逐channel去构造messageSystem和messageSent数据
    let messageSentCount = 0;
    const messageSystemDatas: EntityDict['messageSystem']['CreateMulti']['data'] = [];
    await Promise.all(
        systems.map(
            async (system) => {
                const { application$system: applications, config } = system;
                const notificationDatas: Omit<EntityDict['notification']['CreateSingle']['data'], 'messageSystemId'>[] = [];
                await Promise.all(
                    channels.map(
                        async (channel) => {
                            switch (channel) {
                                case 'mp': {
                                    const app = applications?.find(
                                        ele => ele.type === 'wechatMp',
                                    );
                                    if (app) {
                                        const messageTypeTemplateId = messageTypeTemplateIds.find(
                                            ele => ele.applicationId === app.id && ele.type === type
                                        );
                                        if (messageTypeTemplateId) {
                                            const converter = ConverterDict[type!] && ConverterDict[type!]!.toWechatMp;
                                            const dispersedData = converter && await converter(entity!, entityId!, context);
                                            if (dispersedData) {
                                                notificationDatas.push({
                                                    id: await generateNewIdAsync(),
                                                    data: dispersedData,
                                                    channel,
                                                    applicationId: app.id,
                                                    templateId: messageTypeTemplateId.templateId!,
                                                });
                                            }
                                        }
                                    }
                                    break;
                                }
                                case 'wechatPublic': {
                                    const app = applications?.find(
                                        ele => ele.type === 'wechatPublic',
                                    );
                                    if (app) {
                                        const messageTypeTemplateId = messageTypeTemplateIds.find(
                                            ele => ele.applicationId === app.id && ele.type === type
                                        );
                                        if (messageTypeTemplateId) {
                                            const converter = ConverterDict[type!] && ConverterDict[type!]!.toWechatPublic;
                                            const dispersedData = converter && await converter(entity!, entityId!, context);
                                            if (dispersedData) {
                                                notificationDatas.push({
                                                    id: await generateNewIdAsync(),
                                                    data: dispersedData,
                                                    channel,
                                                    applicationId: app.id,
                                                    templateId: messageTypeTemplateId.templateId!,
                                                });
                                            }
                                        }
                                    }
                                    break;
                                }
                                default: {
                                    assert (channel === 'sms'); // 目前只支持三种
                                    break;
                                }
                            }
                        }
                    )
                );
                if (channels.includes('sms')) {
                    const converter = ConverterDict[type!] && ConverterDict[type!].toSms;
                    if (converter) {
                        const dispersedData = await converter(entity!, entityId!, context);
                        if (dispersedData) {
                            notificationDatas.push({
                                id: await generateNewIdAsync(),
                                data: dispersedData,
                                channel: 'sms',
                            });
                        }
                    }
                }
    
                const messageSystemData: EntityDict['messageSystem']['CreateSingle']['data'] = {
                    id: await generateNewIdAsync(),
                    messageId: message.id,
                    systemId: system.id,
                };
                if (notificationDatas.length > 0) {
                    messageSentCount += notificationDatas.length;
                    messageSystemData.notification$messageSystem = {
                        id: await generateNewIdAsync(),
                        action: 'create',
                        data: notificationDatas,
                    };
                    messageSystemDatas.push(messageSystemData);
                }
            }
        )
    );

    if (messageSystemDatas.length > 0) {
        message.messageSystem$message = {
            id: await generateNewIdAsync(),
            action: 'create',
            data: messageSystemDatas,
        };
    }
    message.iState = messageSentCount ? 'sending' : 'failed';
    return messageSentCount;
}

const triggers: Trigger<EntityDict, 'message', BRC>[] = [
    {
        name: '当创建message时，创建相应的通知数据',
        entity: 'message',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data } = operation;
            let count = 0;
            if (data instanceof Array) {
                for (const d of data) {
                    count += await createNotification(d, context);
                }
            }
            else {
                count = await createNotification(data, context);
            }
            return count;
        }
    } as CreateTrigger<EntityDict, 'message', BRC>,
];
export default triggers;