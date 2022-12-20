import {
    String,
    Boolean,
    Text,
} from 'oak-domain/lib/types/DataType';
import { ActionDef } from 'oak-domain/lib/types/Action';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Index } from 'oak-domain/lib/types/Storage';

export type WechatPublicConfig = {
    type: 'wechatPublic';
    appId: string;
    appSecret: string;
};

export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    name: String<32>;
    description: Text;
    config: WechatPublicConfig;
};


const indexes: Index<Schema>[] = [
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
];

const locale: LocaleDef<
    Schema,
    '',
    '',
    {
    }
> = {
    zh_CN: {
        attr: {
            name: '名称',
            entity: '对象名称',
            entityId: '对象Id',
            description: '描述',
            config: '配置',
        },
    },
};
