import { generateNewId, generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { Trigger, CreateTrigger, UpdateTrigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { CreateOperationData as CreateMessageData } from '../general-app-domain/Message/Schema';
import { assert } from 'oak-domain/lib/utils/assert';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { Schema as MessageSentSchema } from '../entities/MessageSent';
import { MessagePropsToSms, MessagePropsToWechat } from '../types/Message';
import { WechatMpConfig, WechatPublicConfig, WebConfig } from '../general-app-domain/Application/Schema';
import { initialState } from '@uiw/react-amap';

let SmsCoverter: MessagePropsToSms | undefined;
let WechatConverter: MessagePropsToWechat | undefined;

export function registerMessagePropsConverter(converter: {
    sms?: MessagePropsToSms;
    wechat?: MessagePropsToWechat
}) {
    const { sms, wechat } = converter;
    SmsCoverter = sms;
    WechatConverter = wechat;
}


async function tryAddMessageSent(message: CreateMessageData, channel: string, context: BackendRuntimeContext<EntityDict>) {
    if (!WechatConverter) {
        return 0;
    }
    const { systemId, props, type } = message;
    const [application] = await context.select(
        'application',
        {
            data: {
                id: 1,
                name: 1,
                config: 1,
                type: 1,
                systemId: 1,
                style: 1,
            },
            filter: {
                type: 'wechatPublic',
                systemId,
            },
        },
        {}
    );
    const config2 = application.config as WechatPublicConfig;
    const appId = config2.appId;
    let dispersedData;
    switch (channel) {
        case 'weChat': {
            dispersedData = WechatConverter(type!, props!, appId);
            break;
        }
        default: {
            break;
        }
    }
    if (!dispersedData) {
        return 0;
    }
    await context.operate('messageSent', {
        id: await generateNewIdAsync(),
        action: 'create',
        data: {
            messageId: message.id,
            data: dispersedData,
            channel,
        },
    } as EntityDict['messageSent']['CreateSingle'], {});
    return 1;
}

export async function addMessageSent(message: CreateMessageData, context: BackendRuntimeContext<EntityDict>) {
    const { weight } = message;

    switch (weight) {
        case 'high': {
            // 高权重的，所有渠道一起推
            const result = await Promise.all([
                tryAddMessageSent(message, 'wechat', context),
                tryAddMessageSent(message, 'sms', context),
            ]);
            return result.reduce((a, b) => a || b);
        }
        case 'medium': {
            // 中权重的，先推免费渠道，失败了再推收费渠道
            const count = await context.count(
                'messageSent',
                {
                    filter: {
                        messageId: message.id,
                    },
                },
                {},
            );
            if (count < 1) {
                const result = await Promise.all([
                    tryAddMessageSent(message, 'wechat', context),
                ]);
                const count2 = result.reduce((a, b) => a || b);
                if (count2 > 0) {
                    return count2;
                }
                return await tryAddMessageSent(message, 'sms', context);
            }
            return await tryAddMessageSent(message, 'sms', context);
        }
        case 'low': {
            // 低权重的，只推免费渠道
            const result = await Promise.all([
                tryAddMessageSent(message, 'wechat', context),
            ]);
            return result.reduce((a, b) => a || b);
        }
        // case 'data': {

        //     // 透传数据的，只推JPush
        //     const result = await Promise.all([
        //         tryAddMessageSent(message, 'jPush', context),
        //         tryAddMessageSent(message, 'jim', context),
        //     ]);
        //     return result.reduce((a, b) => a || b);
        // }
        default: {
            assert(false);
        }
    }
}


const triggers: Trigger<EntityDict, 'message', RuntimeCxt>[] = [
    {
        name: '当创建message时，创建相应的messageSent',
        entity: 'message',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (messageData: CreateMessageData) => {
                const result = await addMessageSent(messageData, context as BackendRuntimeContext<EntityDict>);
                if (result === 0) {
                    Object.assign(
                        messageData, {
                        iState: 'fail',
                    }
                    )
                }
            }
            if (data instanceof Array) {
                assert('不存在一对多的情况')
            }
            else {
                await fn(data);
            }
            return 0;
        }
    } as CreateTrigger<EntityDict, 'message', RuntimeCxt>,
];
export default triggers;