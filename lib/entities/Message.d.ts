import { Schema as User } from './User';
import { Schema as System } from './System';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export interface Schema extends EntityShape {
    user: User;
    system: System;
    type: 'adminNotification';
    weight: 'high' | 'medium' | 'low' | 'data';
    props: Object;
    data: Object;
    params: Object;
}
