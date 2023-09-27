import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Session } from './Session';
import { Schema as User } from './User';
export interface Schema extends EntityShape {
    user: User;
    session: Session;
}
