import { Schema as Message } from './Message';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Schema as System } from './System';

export interface Schema extends EntityShape {
    message: Message,
    system: System,
};

const locale: LocaleDef<Schema, '', '', {}> = {
    zh_CN: {
        name: '消息系统连接',
        attr: {
            message: '消息',
            system: '系统',
        },
    },
};
