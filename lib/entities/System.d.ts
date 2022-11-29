import { String, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Platform } from './Platform';
import { Config } from '../types/Config';
export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    config: Config;
    platform: Platform;
    super?: Boolean;
}
