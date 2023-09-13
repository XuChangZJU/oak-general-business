import { String } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
}
export declare type Relation = 'owner';
