import { Schema as Message } from './Message';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as System } from './System';
export interface Schema extends EntityShape {
    message: Message;
    system: System;
}
