import { Trigger, CreateTrigger, UpdateTrigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { CreateOperationData as CreateNotificationData } from '../general-app-domain/Notification/Schema';
import { assert } from 'oak-domain/lib/utils/assert';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { WechatMpConfig, WechatPublicConfig, WebConfig } from '../general-app-domain/Application/Schema';
import { WechatSDK } from 'oak-external-sdk';

async function sendMessage(messageSentData: CreateNotificationData, context: BackendRuntimeContext<EntityDict>) {
}

const triggers: Trigger<EntityDict, 'notification', RuntimeCxt>[] = [
    {
        name: '当创建notification后，业务提交后再进行推送',
        entity: 'notification',
        action: 'create',
        when: 'commit',
        strict: 'makeSure',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (messageSentData: CreateNotificationData) => {
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
    } as CreateTrigger<EntityDict, 'notification', RuntimeCxt>,
];
export default triggers;