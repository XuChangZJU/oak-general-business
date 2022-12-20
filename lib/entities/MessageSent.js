"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var IActionDef = {
    stm: {
        succeed: ['sending', 'success'],
        fail: ['sending', 'failure'],
    },
    is: 'sending',
};
var locale = {
    zh_CN: {
        attr: {
            channel: '消息渠道',
            data: '消息数据',
            message: '消息',
            data1: '数据1',
            data2: '数据2',
            iState: '状态',
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
                wechat: '公众号',
                jPush: '极光推送',
                jim: '极光消息',
                mp: '小程序',
                sms: '短信',
            }
        }
    },
};
