import { String, Text, Datetime, Boolean } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    type?: String<32>;
    expiresAt: Datetime;
    expired: Boolean;
    autoExtend: Boolean;
    sceneStr?: Text;
    ticket?: Text;
    url: String<64>;
    isPermanent: Boolean;
}
