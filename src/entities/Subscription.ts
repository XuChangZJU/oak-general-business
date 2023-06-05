import {
    String,
    Boolean,
    Text,
    Int,
} from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export type WechatPublicConfig = {
    type: 'wechatPublic';
    appId: string;
    appSecret: string;
};

export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    name: String<32>;
    description?: Text;
    config?: WechatPublicConfig;
    offset?: Int<4>;
};

const entityDesc: EntityDesc<Schema> = {
    locales: {
        zh_CN: {
            name: '订阅号',
            attr: {
                name: '名称',
                entity: '对象名称',
                entityId: '对象Id',
                description: '描述',
                config: '配置',
                offset: '已同步素材位置',
            },
        },
    },
    indexes: [
        //索引
        {
            name: 'index_name',
            attributes: [
                {
                    name: 'name',
                },
            ],
        },
        {
            name: 'index_entity',
            attributes: [
                {
                    name: 'entity',
                },
                {
                    name: 'entityId',
                }
            ],
        },
    ]
};
