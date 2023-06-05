import { Schema as Message } from './Message';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as System } from './System';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    message: Message,
    system: System,
};

const entityDesc: EntityDesc<Schema> = {
    locales: {
        zh_CN: {
            name: '消息系统连接',
            attr: {
                message: '消息',
                system: '系统',
            },
        },
    }
};
