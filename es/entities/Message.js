;
const IActionDef = {
    stm: {
        succeed: ['sending', 'success'],
        fail: ['sending', 'failure'],
    },
};
const VisitActionDef = {
    stm: {
        visit: ['unvisited', 'visited'],
    },
    is: 'unvisited',
};
const entityDesc = {
    locales: {
        zh_CN: {
            name: '消息',
            attr: {
                entity: '关联对象',
                entityId: '关联对象ID',
                restriction: '限制',
                title: '标题',
                content: '内容',
                user: '关联用户',
                type: '消息类型',
                weight: '优先级',
                iState: '发送状态',
                visitState: '访问状态',
                router: '目标路由',
                data: '透传数据',
                platform: '平台',
                channels: '渠道',
            },
            action: {
                succeed: '成功',
                fail: '失败',
                visit: '阅读',
            },
            v: {
                iState: {
                    sending: '发送中',
                    success: '发送成功',
                    failure: '发送失败',
                },
                visitState: {
                    unvisited: '未读',
                    visited: '已读',
                },
                weight: {
                    high: '高',
                    medium: '中',
                    low: '低',
                },
            },
        },
    },
};
export {};
