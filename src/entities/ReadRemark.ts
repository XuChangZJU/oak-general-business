
import { String, Int, Datetime, Image, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';
import { Schema as Session } from './Session';
import { Schema as User } from './User';
export interface Schema extends EntityShape {
    user: User; //当前用户
    session: Session;//最后一条消息的发送时间
};


const entityDesc: EntityDesc<Schema, '', '', {
}> = {
    locales: {
        zh_CN: {
            name: '会话',
            attr: {
                user: '当前用户',
                session: '会话',
            },
        },
    }
};


