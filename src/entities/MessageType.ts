import {
    String,
} from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';

export interface Schema extends EntityShape {
    type: String<64>
};

const locale: LocaleDef<Schema, '', '', {}> = {
    zh_CN: {
        name: '消息类型',
        attr: {
            type: '类型',
        },
    },
};
