import { String, Int, Datetime, Image, Boolean } from 'oak-domain/lib/types/DataType';
import { Schema as User } from './User';
import { Schema as Application } from './Application';
import { Schema as Token } from './Token';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    origin: 'mp' | 'public' | 'web';
    openId?: String<32>;
    unionId?: String<32>;
    sessionKey?: String<64>;
    accessToken?: String<128>;
    refreshToken?: String<128>;
    scope?: String<64>;
    atExpiredAt?: Datetime;
    rtExpiredAt?: Datetime;
    subscribed?: Boolean;
    subscribedAt?: Datetime;
    unsubscribedAt?: Datetime;
    user?: User;
    application: Application;
    tokens: Array<Token>;
    nickname?: String<128>;
    avatar?: Image;
    remark?: String<32>;
    language: 'zh_CN' | 'zh_TW' | 'en';
};

const entityDesc: EntityDesc<Schema, '', '', {
    origin: Schema['origin'];
    language: Schema['language'];
}> = {
    locales: {
        zh_CN: {
            name: '微信用户',
            attr: {
                origin: '源',
                openId: 'openId',
                unionId: 'unionId',
                sessionKey: 'sessionKey',
                accessToken: 'accessToken',
                refreshToken: 'refreshToken',
                atExpiredAt: 'accessToken过期时间',
                rtExpiredAt: 'refreshToken过期时间',
                scope: 'accessToken域',
                subscribed: '是否订阅',
                subscribedAt: '订阅时间',
                unsubscribedAt: '取关时间',
                user: '用户',
                tokens: '相关令牌',
                application: '应用',
                nickname: '昵称',
                avatar: '头像',
                remark: '备注',
                language: '语言',
            },
            v: {
                origin: {
                    mp: '小程序',
                    public: '公众号',
                    web: '网站',
                },
                language: {
                    zh_CN: '简体',
                    zh_TW: '繁体',
                    en: '英语'
                }
            }
        },
    }
};
