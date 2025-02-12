import { makeAbleActionDef } from 'oak-domain/lib/actions/action';
;
const AbleActionDef = makeAbleActionDef('enabled');
const entityDesc = {
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
