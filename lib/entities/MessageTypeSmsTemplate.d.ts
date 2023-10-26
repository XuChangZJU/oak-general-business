import { String } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as SmsTemplate } from './SmsTemplate';
export interface Schema extends EntityShape {
    type: String<64>;
    template: SmsTemplate;
}
