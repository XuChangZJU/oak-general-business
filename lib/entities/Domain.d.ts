import { String, Int } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as System } from './System';
export interface Schema extends EntityShape {
    url: String<64>;
    apiPath: String<32>;
    protocol: 'http' | 'https';
    port: Int<2>;
    system: System;
}
