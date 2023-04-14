import { String } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Channel } from '../types/Message';
import { Schema as Application } from './Application';
import { Schema as MessageSystem } from './MessageSystem';
export interface Schema extends EntityShape {
    channel: Channel;
    application?: Application;
    data?: Object;
    messageSystem: MessageSystem;
    data1?: Object;
    data2?: Object;
    templateId?: String<128>;
}
