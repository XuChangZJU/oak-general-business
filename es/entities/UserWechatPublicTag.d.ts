import { Datetime, Boolean } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as WechatPublicTag } from './WechatPublicTag';
import { Schema as User } from './User';
export interface Schema extends EntityShape {
    wechatPublicTag: WechatPublicTag;
    user: User;
    sync: Boolean;
    syncAt: Datetime;
}
