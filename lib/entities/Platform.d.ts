import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Config } from '../types/Config';
export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    config: Config;
}
