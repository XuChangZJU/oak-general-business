import {
    String,
    Float,
    Int,
    Boolean,
    Datetime,
} from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Application } from './Application';
import { Schema as WechatTemplate } from './WechatTemplate';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    type: String<64>,
    template: WechatTemplate,
};

const entityDesc: EntityDesc<Schema> = {
    locales: {
        zh_CN: {
            name: '消息类型模板关联',
            attr: {
                type: '消息类型',
                template: '公众号消息模板',
            },
        },
    },
};
