import { String, Text, Datetime, Boolean } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Index } from 'oak-domain/lib/types/Storage';
import { Schema as Application } from './Application';

export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    type?: String<32>; //类型
    expiresAt: Datetime; // 过期时间
    expired: Boolean; //是否过期
    autoExtend: Boolean;
    sceneStr?: Text;
    ticket?: Text;
    url?: String<64>;
    isPermanent: Boolean; //是否永久码
    buffer?: Text;  // 若没有url，使用buffer存储生成的小程序码数据（base64)
    application: Application;
    props?: Object;
}

const indexes: Index<Schema>[] = [
    {
        name: 'index_entity_entityId',
        attributes: [
            {
                name: 'entity',
            },
            {
                name: 'entityId',
            },
        ],
    },
    {
        name: 'index_expired_expiresAt',
        attributes: [
            {
                name: 'expired',
            },
            {
                name: 'expiresAt',
            },
        ],
    },
    {
        name: 'index_url',
        attributes: [
            {
                name: 'url',
            },
        ],
    },
];
