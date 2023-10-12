import { String, Price } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export interface Schema extends EntityShape {
    total: Price;
    avail: Price;
    entity?: String<32>;
    entityId?: String<64>;
}
