import { Schema as Message } from './Message';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export interface Schema extends EntityShape {
    channel: 'wechat' | 'jPush' | 'jim' | 'mp' | 'sms';
    data: Object;
    message: Message;
    data1: Object;
    data2: Object;
}
