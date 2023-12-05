import { Datetime, Boolean } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as WechatPublicTag } from './WechatPublicTag';
import { Schema as WechatUser } from './WechatUser';
export interface Schema extends EntityShape {
    wechatPublicTag: WechatPublicTag;
    wechatUser: WechatUser;
    sync: Boolean;
    syncAt: Datetime;
}
