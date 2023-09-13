import { String, Int, Datetime, Image, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
};


export type Relation = 'owner';
const entityDesc: EntityDesc<Schema, '', Relation, {
}> = {
    locales: {
        zh_CN: {
            name: '会话',
            attr: {
                entity: '关联对象',
                entityId: '关联对象id',
            },
            r: {
                owner: '所有者',
            }
        },
    }
};


