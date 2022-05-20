import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Index } from 'oak-domain/lib/types/Storage';
import { Schema as User } from './User';

export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    relation: String<32>;
    action: String<32>;
    remark?: Text;
    uuid: String<32>;
    granter: User;
    grantee?: User;
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
                name: 'uuid',
            },
        ],
    },
];

