import { String, Int, Datetime, Price, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { AbleAction, AbleState, makeAbleActionDef } from 'oak-domain/lib/actions/action';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';
import { ActionDef } from 'oak-domain/lib/types/Action';

export interface Schema extends EntityShape {
    total: Price;
    avail: Price;
    entity?: String<32>;
    entityId?: String<64>;
};

type PayAction = 'charge' | 'withdraw' | 'cost' | 'refund' | 'loan' | 'repay';

type Action = AbleAction | PayAction;

const AbleActionDef: ActionDef<AbleAction, AbleState> = makeAbleActionDef('enabled');

type Relation = 'owner' | 'audit';

const entityDesc: EntityDesc<Schema, Action, Relation, {
    ableState: AbleState,
}> = {
    locales: {
        zh_CN: {
            name: '地址',
            attr: {
                ableState: '状态',
                total: '余额',
                avail: '可用余额',
                entity: '对象实体',
                entityId: '对象实体Id'
            },
            action: {
                charge: '充值',
                withdraw: '提现',
                cost: '支付',
                refund: '退款',
                loan: '抵押',
                repay: '归还',
                enable: '启用',
                disable: '禁用',
            },
            r: {
                owner: '所有者',
                audit: '审核者',
            },
            v: {
                ableState: {
                    enabled: '正常',
                    disabled: '冻结',
                },
            }
        },
    },
};
