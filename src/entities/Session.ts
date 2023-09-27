import { String, Int, Datetime, Image, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';
import { Schema as User } from './User';
export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    user?: User; //发送者
    lmts?: Datetime;//最后一条消息的发送时间
};


export type Relation = 'partner';
const entityDesc: EntityDesc<Schema, '', Relation, {
}> = {
    locales: {
        zh_CN: {
            name: '会话',
            attr: {
                entity: '关联对象',
                entityId: '关联对象id',
                user: '发送者',
                lmts: '最后一条消息的发送时间',
            },
            r: {
                partner: '所有者',
            }
        },
    }
};


