import { Boolean, Text, Datetime, Int, String } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Index } from 'oak-domain/lib/types/Storage';
import { Schema as Message } from './Message';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

type Jump_wxa = {
    path?: string;
    query?: string;
    env_version?: string;
};
export interface Schema extends EntityShape {
    message?: Message;
    jump_wxa?: Jump_wxa;
    openlink?: String<256>;
    expireType?: Int<1>;//到期失效的 scheme 码失效类型，失效时间：0，失效间隔天数：1 ,默认0
    expireInterval?: Int<2>;//expire_type 为 1 时必填,失效的间隔天数
    expiresAt?: Datetime;//expire_type 为 0 时必填,失效的时间
    expired?: Boolean;
}



const entityDesc: EntityDesc<
    Schema,
    '',
    '',
    {
    }
> = {
    locales: {
        zh_CN: {
            name: '短信跳小程序',
            attr: {
                message: '消息',
                expired: '是否过期',
                jump_wxa: '目标小程序信息',
                openlink: "目标链接及参数",
                expireType: '失效类型',
                expireInterval: '到期失效的间隔',
                expiresAt: '过期时间',

            },
        },
    },
    indexes: [
        {
            name: 'index_uuid',
            attributes: [
                {
                    name: 'expired',
                },
                {
                    name: 'expiresAt',
                },
            ],
        },
    ],
};
