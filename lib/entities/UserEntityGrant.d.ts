import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as User } from './User';
import { Schema as WechatQrCode } from './WechatQrCode';
export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    relation: String<32>;
    action: String<32>;
    remark?: Text;
    uuid: String<32>;
    granter: User;
    grantee?: User;
    files: Array<WechatQrCode>;
}
