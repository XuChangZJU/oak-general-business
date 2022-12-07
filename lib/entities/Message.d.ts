import { Text } from 'oak-domain/lib/types/DataType';
import { Schema as User } from './User';
import { Schema as System } from './System';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export interface Schema extends EntityShape {
    user: User;
    system: System;
    type: 'adminNotification' | 'conversationMessage';
    weight: 'high' | 'medium' | 'low' | 'data';
    desc: Text;
    props: Object;
    data: Object;
    params: Object;
}
