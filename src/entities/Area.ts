import { String, Geo } from 'oak-domain/lib/types/DataType';
import { EntityShape, Configuration } from 'oak-domain/lib/types/Entity';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    name: String<32>;
    level: 'province' | 'city' | 'district' | 'street' | 'country';
    depth: 0 | 1 | 2 | 3 | 4;
    parent?: Schema;
    code: String<12>;
    center: Geo;
};


const entityDesc: EntityDesc<Schema, '', '', {
    level: Schema['level'];
}> = {
    locales: {
        zh_CN: {
            name: '地区',
            attr: {
                level: '层级',
                depth: '深度',
                parent: '上级地区',
                name: '名称',
                code: '地区编码',
                center: '中心坐标',
            },
            v: {
                level: {
                    country: '国家',
                    province: '省',
                    city: '市',
                    district: '区',
                    street: '街道',
                }
            }
        },
    },
    configuration: {
        actionType: 'readOnly',
        static: true,
    },
};
