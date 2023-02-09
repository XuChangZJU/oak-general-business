import { generateNewId, generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { Trigger, CreateTrigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { CreateOperationData as CreateMessageData } from '../general-app-domain/Message/Schema';
import { CreateOperationData as CreateMessageSentData } from '../general-app-domain/MessageSent/Schema';
import { assert } from 'oak-domain/lib/utils/assert';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { Channel, MessagePropsToSms, MessagePropsToWechatPublic, MessagePropsToWechatMp, Weight } from '../types/Message';
import { WechatPublicConfig } from '../general-app-domain/Application/Schema';

let SmsCoverter: MessagePropsToSms | undefined;
let WechatPublicConverter: MessagePropsToWechatPublic | undefined;
let WechatMpConverter: MessagePropsToWechatMp | undefined;


export function registerMessagePropsConverter(converter: {
    sms?: MessagePropsToSms;
    wechatPublic?: MessagePropsToWechatPublic;
    wechatMp?: MessagePropsToWechatMp;
}) {
    const { sms, wechatPublic, wechatMp } = converter;
    SmsCoverter = sms;
    WechatPublicConverter = wechatPublic;
    WechatMpConverter = wechatMp;
}


const InitialChannalByWeightMatrix: Record<Weight, Channel[]> = {
    high: ['mp', 'wechatPublic', 'sms'],
    medium: ['mp', 'wechatPublic'],
    low: ['mp', 'wechatPublic'],
};

async function assignMessageSystemAndSent(message: CreateMessageData, context: RuntimeCxt) {
    const { restriction, userId, weight, type, props } = message;
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

    // 根据定义所限制的渠道和weight，计算出相应的推送渠道
    const channels = InitialChannalByWeightMatrix[weight!].filter(
        ele => {
            if (restriction && restriction.channels) {
                return restriction.channels.includes(ele);
            }
            return true;
        }
    );

    // 逐system逐channel去构造messageSystem和messageSent数据
    let messageSentCount = 0;
    const messageSystemDatas: EntityDict['messageSystem']['CreateMulti']['data'] = [];
    systems.forEach(
        (system) => {
            const { application$system: applications, config } = system;
            const messageSentDatas: Omit<EntityDict['messageSent']['CreateSingle']['data'], 'messageSystemId'>[] = [];
            channels.forEach(
                (channel) => {
                    switch (channel) {
                        case 'mp': {
                            const app = applications?.find(
                                ele => ele.type === 'wechatMp',
                            );
                            if (app) {
                                const dispersedData = WechatMpConverter && WechatMpConverter(type!, props!, app.id!);
                                if (dispersedData) {
                                    messageSentDatas.push({
                                        id: generateNewId(),
                                        data: dispersedData,
                                        channel,
                                        applicationId: app.id,
                                    });
                                }
                            }
                            break;
                        }
                        case 'wechatPublic': {
                            const app = applications?.find(
                                ele => ele.type === 'wechatPublic',
                            );
                            if (app) {
                                const { id, config } = app;
                                const dispersedData = WechatPublicConverter && WechatPublicConverter(type!, props!, app.id!);
                                if (dispersedData) {
                                    messageSentDatas.push({
                                        id: generateNewId(),
                                        data: dispersedData,
                                        channel,
                                        applicationId: app.id,
                                    });
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
            );
            if (channels.includes('sms')) {
                const dispersedData = SmsCoverter && SmsCoverter(type!, props!, system.id);
                if (dispersedData) {
                    messageSentDatas.push({
                        id: generateNewId(),
                        data: dispersedData,
                        channel: 'sms',
                    });
                }
            }

            const messageSystemData: EntityDict['messageSystem']['CreateSingle']['data'] = {
                id: generateNewId(),
                messageId: message.id,
                systemId: system.id,
            };
            if (messageSentDatas.length > 0) {
                messageSentCount += messageSentDatas.length;
                messageSystemData.messageSent$messageSystem = {
                    id: generateNewId(),
                    action: 'create',
                    data: messageSentDatas,
                };
            }
            messageSystemDatas.push(messageSystemData);
        }
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


const triggers: Trigger<EntityDict, 'message', RuntimeCxt>[] = [
    {
        name: '当创建message时，创建相应的messageSystem和messageSent',
        entity: 'message',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data } = operation;
            let count = 0;
            if (data instanceof Array) {
                for (const d of data) {
                    count += await assignMessageSystemAndSent(d, context);
                }
            }
            else {
                count = await assignMessageSystemAndSent(data, context);
            }
            return count;
        }
    } as CreateTrigger<EntityDict, 'message', RuntimeCxt>,
];
export default triggers;