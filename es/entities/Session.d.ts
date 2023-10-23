import { String, Datetime } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as User } from './User';
export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    user?: User;
    lmts?: Datetime;
    openId?: String<32>;
}
export type Relation = 'partner';
