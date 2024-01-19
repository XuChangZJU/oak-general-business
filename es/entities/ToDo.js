;
const IActionDef = {
    stm: {
        complete: ['active', 'done'],
    },
};
const entityDesc = {
    locales: {
        zh_CN: {
            name: '待办',
            attr: {
                iState: '状态',
                title: '标题',
                description: '描述',
                targetEntity: '对象实体',
                targetFilter: '过滤条件',
                action: '动作',
                redirectTo: '重定向页面',
                entity: '关联对象',
                entityId: '关联对象id',
            },
            r: {
                collaborator: '协作者',
            },
            action: {
                complete: '完成',
            },
            v: {
                iState: {
                    active: '待办',
                    done: '已完成',
                },
            },
        },
    },
};
export {};
