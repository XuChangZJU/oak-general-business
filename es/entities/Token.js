import { makeAbleActionDef } from 'oak-domain/lib/actions/action';
;
const AbleActionDef = makeAbleActionDef('enabled');
const entityDesc = {
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
                refreshedAt: "刷新时间",
                value: "令牌值"
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
    },
    indexes: [
        {
            name: 'index_value',
            attributes: [
                {
                    name: 'value',
                },
                {
                    name: '$$deleteAt$$',
                },
            ],
            config: {
                unique: true,
            },
        },
    ],
};
