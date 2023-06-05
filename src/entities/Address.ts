import { String, Int, Datetime, Image, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Area } from './Area';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    detail: String<32>;
    area: Area;
    phone: String<12>;
    name: String<32>;
    default: Boolean;
    remark: Text;
};

const entityDesc: EntityDesc<Schema> = {
    locales: {
        zh_CN: {
            name: '地址',
            attr: {
                detail: '详细地址',
                area: '所在地区',
                phone: '联系电话',
                name: '姓名',
                default: '是否默认',
                remark: '备注',
            },
        },
    },
};
