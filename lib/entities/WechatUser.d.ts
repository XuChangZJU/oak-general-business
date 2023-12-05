import { String, Datetime, Image, Boolean } from 'oak-domain/lib/types/DataType';
import { Schema as User } from './User';
import { Schema as Application } from './Application';
import { Schema as Token } from './Token';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export interface Schema extends EntityShape {
    origin: 'mp' | 'public' | 'web' | 'native';
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
}
