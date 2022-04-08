import { String } from 'oak-domain/lib/types/DataType';
import { Schema as User } from './User';
import { Schema as Application } from './Application';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export interface Schema extends EntityShape {
    application: Application;
    entity: String<32>;
    entityId: String<64>;
    user?: User;
    player?: User;
}
