;
const IActionDef = {
    stm: {
        success: [['wait', 'fail'], 'success'],
        fail: [['wait', 'success'], 'fail']
    },
    is: 'wait',
};
const entityDesc = {
    locales: {
        zh_CN: {
            name: '用户公众号Tag',
            attr: {
                wechatPublicTag: 'tag',
                wechatUser: '微信用户',
                sync: '同步状态',
                syncAt: '同步时间',
                iState: '状态',
            },
            action: {
                sync: '同步',
                success: '成功',
                fail: '失败'
            },
            v: {
                iState: {
                    wait: '待同步',
                    success: '同步成功',
                    fail: '同步失败',
                }
            }
        },
    }
};
export {};
