import {
    String,
    Float,
    Int,
    Boolean,
    Datetime,
} from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Schema as Application } from './Application';

export interface Schema extends EntityShape {
    type: String<64>,
    templateId: String<128>,
    application: Application,
};

const locale: LocaleDef<Schema, '', '', {}> = {
    zh_CN: {
        attr: {
            type: '消息类型',
            templateId: '模板编号',
            application: '关联应用',
        },
    },
};
