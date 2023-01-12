import { String, Text } from 'oak-domain/lib/types/DataType';
import { Schema as User } from './User';
import { Schema as System } from './System';
import { EntityShape } from 'oak-domain/lib/types/Entity';
declare type MessageParams = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};
export interface Schema extends EntityShape {
    user: User;
    system: System;
    type: String<64>;
    weight: 'high' | 'medium' | 'low' | 'data';
    title: String<32>;
    content: Text;
    props: Object;
    data?: Object;
    params?: MessageParams;
}
export {};
