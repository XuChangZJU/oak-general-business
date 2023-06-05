import {
    String,
    Float,
    Int,
    Boolean,
    Datetime,
} from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Application } from './Application';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    type: String<64>,
    templateId: String<128>,
    application: Application,
};

const entityDesc: EntityDesc<Schema> = {
    locales: {
        zh_CN: {
            name: '消息类型模板',
            attr: {
                type: '消息类型',
                templateId: '模板编号',
                application: '关联应用',
            },
        },
    },
};
