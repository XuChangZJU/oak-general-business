import { String, Int, Text, Image } from 'oak-domain/lib/types/DataType';
import { Schema as User } from './User';
import { Schema as Token } from './Token';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { AbleAction, AbleState, makeAbleActionDef } from 'oak-domain/lib/actions/action';
import { ActionDef, Index } from 'oak-domain/lib/types';

export interface Schema extends EntityShape {
    email: String<16>;
    user: User;
    tokens: Array<Token>;
};

type Action = AbleAction;
const AbleActionDef: ActionDef<AbleAction, AbleState> = makeAbleActionDef('enabled');

const indexes: Index<Schema>[] = [
    {
        name: 'index_email_ableState',
        attributes: [
            {
                name: 'email',
                direction: 'ASC',
            },
            {
                name: 'ableState',
                direction: 'ASC',
            }
        ],
    },
];

const locale: LocaleDef<Schema, Action, '', {
    ableState: AbleState;
}> = {
    zh_CN: {
        name: '邮箱',
        attr: {
            ableState: '是否可用',
            email: '邮箱',
            user: '关联用户',
            tokens: '相关令牌',
        },
        action: {
            enable: '启用',
            disable: '禁用',
        },
        v: {
            ableState: {
                enabled: '可用的',
                disabled: '禁用的',
            }
        }
    },
};
