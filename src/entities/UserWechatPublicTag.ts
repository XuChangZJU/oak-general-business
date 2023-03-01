import { String, Text, Datetime, Boolean, Uint } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Schema as WechatPublicTag } from './WechatPublicTag';
import { Schema as User } from './User';

export interface Schema extends EntityShape {
    wechatPublicTag: WechatPublicTag;
    user: User;
    sync: Boolean;
    syncAt: Datetime;
};


const locale: LocaleDef<Schema, '', '', {}> = {
    zh_CN: {
        name: '用户公众号Tag',
        attr: {
            wechatPublicTag: 'tag',
            user: '用户',
            sync: '同步状态',
            syncAt: '同步时间',
        },
    },
 };