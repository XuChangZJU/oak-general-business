import { String } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Application } from './Application';
export interface Schema extends EntityShape {
    type: String<64>;
    templateId: String<128>;
    application: Application;
}
