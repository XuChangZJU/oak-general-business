import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    config: Object;
}
export declare type Relation = 'owner';
