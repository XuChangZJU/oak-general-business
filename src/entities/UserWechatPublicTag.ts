import { String, Text, Datetime, Boolean, Uint } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as WechatPublicTag } from './WechatPublicTag';
import { Schema as WechatUser } from './WechatUser';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    wechatPublicTag: WechatPublicTag;
    wechatUser: WechatUser;
    sync: Boolean;
    syncAt: Datetime;
};

const entityDesc: EntityDesc<Schema> = {
    locales: {
        zh_CN: {
            name: '用户公众号Tag',
            attr: {
                wechatPublicTag: 'tag',
                wechatUser: '微信用户',
                sync: '同步状态',
                syncAt: '同步时间',
            },
        },
    }
};
