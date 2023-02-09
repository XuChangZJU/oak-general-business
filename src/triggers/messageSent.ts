import { Trigger, CreateTrigger, UpdateTrigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { CreateOperationData as CreateMessageSentData } from '../general-app-domain/MessageSent/Schema';
import { assert } from 'oak-domain/lib/utils/assert';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { addMessageSent } from './message';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { WechatMpConfig, WechatPublicConfig, WebConfig } from '../general-app-domain/Application/Schema';
import { WechatSDK } from 'oak-external-sdk';

async function sendMessage(messageSentData: CreateMessageSentData, context: BackendRuntimeContext<EntityDict>) {
    const { data, channel, messageId } = messageSentData;
    const [message] = await context.select(
        'message',        
        {
            data: {
                id: 1,
                systemId: 1,
            },
            filter: {
                id: messageId,
            },
        },
        {}
    );
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
                systemId: message.systemId,
            },
        },
        {}
    );
    const config2 = application.config as WechatPublicConfig;
    const appId = config2.appId;

}

const triggers: Trigger<EntityDict, 'messageSent', RuntimeCxt>[] = [
    {
        name: '当创建messageSent后，业务提交后再进行推送',
        entity: 'messageSent',
        action: 'create',
        when: 'commit',
        strict: 'makeSure',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (messageSentData: CreateMessageSentData) => {
                await sendMessage(messageSentData, context as BackendRuntimeContext<EntityDict>);
            }
            if (data instanceof Array) {
                assert('不存在一对多的情况')
            }
            else {
                await fn(data);
            }
            return 0;
        }
    } as CreateTrigger<EntityDict, 'messageSent', RuntimeCxt>,
];
export default triggers;