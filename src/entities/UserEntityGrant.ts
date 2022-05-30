import { String, Text, Datetime } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Index } from 'oak-domain/lib/types/Storage';
import { Schema as User } from './User';
import { Schema as WechatQrCode } from './WechatQrCode';

export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    relation: String<32>;
    action: String<32>;
    remark?: Text;
    granter: User;
    grantee?: User;
    files: Array<WechatQrCode>;
    expiresAt?: Datetime;
    expired?: Boolean;
}

const indexes: Index<Schema>[] = [
    {
        name: 'index_entity_entityId',
        attributes: [
            {
                name: 'entity',
            },
            {
                name: 'entityId',
            },
        ],
    },
    {
        name: 'index_uuid',
        attributes: [
            {
                name: 'expired',
            },
            {
                name: 'expiresAt',
            }
        ],
    },
];

