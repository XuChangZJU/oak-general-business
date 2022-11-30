import { String, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Platform } from './Platform';
import { Config } from '../types/Config';
import { Style } from '../types/Style';
export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    config: Config;
    platform: Platform;
    folder: String<16>;
    super?: Boolean;
    style?: Style;
}
