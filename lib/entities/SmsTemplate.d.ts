import { String, Text, Datetime } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as System } from './System';
export interface Schema extends EntityShape {
    system: System;
    origin: 'ali' | 'tencent';
    templateName: Text;
    templateCode: String<64>;
    templateContent: Text;
    syncAt: Datetime;
}
