import { EntityShape } from 'oak-domain/lib/types/Entity';
import { String, Text, Boolean, Datetime } from 'oak-domain/lib/types/DataType';
export interface Schema extends EntityShape {
    mobile: String<11>;
    code: String<4>;
    visitorId: Text;
    reason?: Text;
    env: Object;
    expired: Boolean;
    expiresAt: Datetime;
}
