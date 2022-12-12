import { Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { RuntimeCxt } from '../types/RuntimeCxt';
import { MessagePropsToSms, MessagePropsToWechat } from '../types/Message';
export declare function registerMessagePropsConverter(converter: {
    sms?: MessagePropsToSms;
    wechat?: MessagePropsToWechat;
}): void;
declare const triggers: Trigger<EntityDict, 'message', RuntimeCxt>[];
export default triggers;
