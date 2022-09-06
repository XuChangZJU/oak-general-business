import { String, Datetime } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export interface Schema extends EntityShape {
    title: String<32>;
    streamTitle: String<32>;
    liveonly: 'online' | 'offline';
    hub: String<32>;
    streamKey: String<64>;
    entity: String<32>;
    entityId: String<64>;
    rtmpPushUrl: String<64>;
    rtmpPlayUrl: String<64>;
    pcPushUrl: String<64>;
    expireAt: Datetime;
}
