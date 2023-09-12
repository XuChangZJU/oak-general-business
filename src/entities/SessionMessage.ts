import { String, Int, Datetime, Image, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';
import { Schema as Session } from './Session';
import { Schema as User } from './User';
import { Schema as WechatUser } from './WechatUser';
import { Schema as Application } from './Application';
import { Schema as ExtraFile } from './ExtraFile';

type Type = 'text' | 'image' | 'audio' | 'video' | 'news' | 'link';

export interface Schema extends EntityShape {
    application: Application;
    session: Session;
    user?: User;
    wechatUser?: WechatUser;
    createTime?: Datetime;
    type: Type;
    text?: Text;
    file?: ExtraFile;
    news?: String<128>;    
    aaoe?: Boolean;          // as agent of entity
};
