"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var action_1 = require("oak-domain/lib/actions/action");
;
var AbleActionDef = (0, action_1.makeAbleActionDef)('enabled');
var indexes = [
    {
        name: 'index_email_ableState',
        attributes: [
            {
                name: 'email',
                direction: 'ASC',
            },
            {
                name: 'ableState',
                direction: 'ASC',
            }
        ],
    },
];
var locale = {
    zh_CN: {
        attr: {
            ableState: '是否可用',
            email: '邮箱',
            user: '关联用户',
            tokens: '相关令牌',
        },
        action: {
            enable: '启用',
            disable: '禁用',
        },
        v: {
            ableState: {
                enabled: '可用的',
                disabled: '禁用的',
            }
        }
    },
};
