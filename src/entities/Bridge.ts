import {
    String,
    Int,
    Datetime,
    Image,
    Boolean,
    Text,
} from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

type RedirectTo = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};

export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    expiresAt: Datetime;
    expired: Boolean;
    redirectTo: RedirectTo;
}

type IAction = 'cancel' | 'qrcode';
type Action = IAction;

const entityDesc: EntityDesc<
    Schema,
    Action,
    '',
    {}
> = {
    locales: {
        zh_CN: {
            name: '二维码链接',
            attr: {
                expired: '已过期',
                expiresAt: '过期时间',
                redirectTo: '重定向页面',
                entity: '关联对象',
                entityId: '关联对象Id',
            },
            action: {
                cancel: '作废',
                qrcode: '二维码',
            },
        },
    },
};

