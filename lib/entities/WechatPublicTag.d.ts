import { String, Datetime, Boolean, Uint } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Application } from './Application';
export interface Schema extends EntityShape {
    text: String<32>;
    application: Application;
    wechatId: Uint<4>;
    sync: Boolean;
    syncAt: Datetime;
}
