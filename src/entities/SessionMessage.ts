import { String, Int, Datetime, Image, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';
import { Schema as Session } from './Session';
import { Schema as User } from './User';
import { Schema as WechatUser } from './WechatUser';
import { Schema as Application } from './Application';
import { Schema as ExtraFile } from './ExtraFile';

type Type =
    | 'text'
    | 'image'
    | 'voice'
    | 'video'
    | 'location'
    | 'link'
    | 'event'
    | 'miniprogrampage';

export interface Schema extends EntityShape {
    application: Application;
    session: Session;
    user?: User;
    wechatUser?: WechatUser; //表示微信客服消息回调服务器传过来
    createTime?: Datetime;
    type: Type;
    text?: Text;
    files?: ExtraFile[];
    link?: String<128>;
    aaoe?: Boolean; // as agent of entity
    extra?: Object;
};

const entityDesc: EntityDesc<Schema, '', '', {}> = {
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
                text: '文本内容',
                files: '文件',
                link: '图文',
                aaoe: '作为实体的发起者',
                extra: '额外信息',
            },
            v: {
                type: {
                    text: '文字',
                    image: '图片',
                    voice: '音频',
                    video: '视频',
                    link: '图文',
                    location: '位置',
                    event: '事件',
                    miniprogrampage: '小程序',
                },
            },
        },
    },
};
