import { Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { CreateOperationData as CreateMessageData } from '../general-app-domain/Message/Schema';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { MessagePropsToSms, MessagePropsToWechat } from '../types/Message';
export declare function registerMessagePropsConverter(converter: {
    sms?: MessagePropsToSms;
    wechat?: MessagePropsToWechat;
}): void;
export declare function addMessageSent(message: CreateMessageData, context: BackendRuntimeContext<EntityDict>): Promise<0 | 1>;
declare const triggers: Trigger<EntityDict, 'message', RuntimeCxt>[];
export default triggers;
