import { String, Datetime, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Session } from './Session';
import { Schema as User } from './User';
import { Schema as WechatUser } from './WechatUser';
import { Schema as Application } from './Application';
import { Schema as ExtraFile } from './ExtraFile';
type Type = 'text' | 'image' | 'audio' | 'video' | 'news';
export interface Schema extends EntityShape {
    application: Application;
    session: Session;
    user?: User;
    wechatUser?: WechatUser;
    createTime?: Datetime;
    type: Type;
    text?: Text;
    files?: ExtraFile[];
    news?: String<128>;
    aaoe?: Boolean;
}
export {};
