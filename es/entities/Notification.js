;
const IActionDef = {
    stm: {
        succeed: ['sending', 'success'],
        fail: ['sending', 'failure'],
    },
    is: 'sending',
};
const entityDesc = {
    locales: {
        zh_CN: {
            name: '通知',
            attr: {
                channel: '消息渠道',
                data: '消息数据',
                messageSystem: '消息系统连接',
                data1: '数据1',
                data2: '数据2',
                iState: '状态',
                application: '关联应用',
                templateId: '模板id'
            },
            action: {
                succeed: '成功',
                fail: '失败',
            },
            v: {
                iState: {
                    sending: '发送中',
                    success: '发送成功',
                    failure: '发送失败',
                },
                channel: {
                    wechatPublic: '公众号',
                    jPush: '极光推送',
                    jim: '极光消息',
                    wechatMp: '小程序',
                    sms: '短信',
                }
            }
        },
    }
};
export {};
