"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
const IActionDef = {
    stm: {
        send: ['unsent', 'sending'],
        success: ['sending', 'sent'],
        fail: ['sending', 'failure'],
    },
    is: 'unsent',
};
const indexes = [
    {
        name: 'index_mobile_code',
        attributes: [
            {
                name: 'mobile',
                direction: 'ASC',
            },
            {
                name: 'code',
                direction: 'ASC',
            },
            {
                name: '$$createAt$$',
                direction: 'DESC',
            }
        ],
    },
];
const locale = {
    zh_CN: {
        attr: {
            mobile: '手机号',
            code: '验证码',
            visitorId: '用户标识',
            reason: '失败原因',
            env: '用户环境',
            expired: '是否过期',
            expiresAt: '过期时间',
            iState: '状态',
        },
        action: {
            send: '发送',
            fail: '失败',
            success: '成功',
        },
        v: {
            iState: {
                unsent: '未发送',
                sending: '发送中',
                sent: '已发送',
                failure: '已失败',
            }
        },
    },
};
