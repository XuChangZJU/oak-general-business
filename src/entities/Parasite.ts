import { String, Int, Datetime, Image, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Schema as User } from './User';
import { Schema as Token } from './Token';

type RedirectTo = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};

export interface Schema extends EntityShape {
    user: User;
    entity: String<32>;
    entityId: String<64>;
    showTip?: Boolean;
    expiresAt: Datetime;
    expired: Boolean;
    redirectTo: RedirectTo;
    multiple?: Boolean;
    tokenLifeLength?: Int<4>;
    tokens: Token[];
};

type IAction = 'wakeup';
type Action = IAction;

const locale: LocaleDef<Schema, Action, '', {
}> = {
    "zh_CN": {
        name: '寄生',
        attr: {
            user: '用户',
            showTip: '提示',
            expired: '已过期',
            expiresAt: '过期时间',
            redirectTo: '重定向页面',
            multiple: '允许反复使用',
            tokens: '令牌',
            entity: '关联对象',
            entityId: '关联对象Id',
            tokenLifeLength: '令牌生命长度',
        },
        action: {
            wakeup: '激活',
        },
    }
};

