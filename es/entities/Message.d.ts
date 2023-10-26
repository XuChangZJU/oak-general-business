import { String, Text } from 'oak-domain/lib/types/DataType';
import { Schema as User } from './User';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Channel, Weight } from '../types/Message';
import { Schema as Platform } from './Platform';
type Router = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
    isTabBar?: boolean;
};
type MessageRestriction = {
    systemIds?: string[];
    channels?: Array<Channel>;
};
type Chaanels = Channel[];
export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    user: User;
    type: String<64>;
    weight: Weight;
    restriction?: MessageRestriction;
    title: String<256>;
    content: Text;
    data?: Object;
    router?: Router;
    platform?: Platform;
    channels?: Chaanels;
}
export {};
