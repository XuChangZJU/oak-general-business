import { String, Int, Datetime, Image, Boolean } from 'oak-domain/lib/types/DataType';
import { Schema as User } from './User';
import { Schema as Application } from './Application';
import { AbleAction, AbleState, makeAbleActionDef } from 'oak-domain/lib/actions/action';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { ActionDef } from 'oak-domain/lib/types/Action';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';
import { Environment } from 'oak-domain/lib/types/Environment';

export interface Schema extends EntityShape {
    application?: Application;
    entity: String<32>;
    entityId: String<64>;
    user?: User;
    player?: User;
    disablesAt?: Datetime;
    env: Environment;
};

type Action = AbleAction;

const AbleActionDef: ActionDef<AbleAction, AbleState> = makeAbleActionDef('enabled');

const entityDesc: EntityDesc<Schema, Action, '', {
    ableState: AbleState,
}> = {
    locales: {
        zh_CN: {
            name: '令牌',
            attr: {
                application: '应用',
                entity: '关联对象',
                entityId: '关联对象id',
                user: '用户',
                player: '扮演者',
                env: '环境',
                ableState: '状态',
                disablesAt: '禁用时间',
            },
            action: {
                enable: '激活',
                disable: '禁用',
            },
            v: {
                ableState: {
                    enabled: '使用中',
                    disabled: '已禁用'
                },
            },
        },
    }
};
