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
const entityDesc: EntityDesc<Schema, '', '', {
}> = {
    locales: {
        zh_CN: {
            name: '消息',
            attr: {
                application: '应用',
                session: '会话',
                user: '用户',
                wechatUser: '微信用户',
                createTime: '发送时间',
                type: '消息类型',
                text: '文字内容',
                file: '文件',
                news: '文章',
                aaoe: '作为实体的发起者',
            },

        },
    }
};
