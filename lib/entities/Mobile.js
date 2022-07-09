"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("oak-domain/lib/actions/action");
;
const AbleActionDef = (0, action_1.makeAbleActionDef)('enabled');
const locale = {
    zh_CN: {
        attr: {
            ableState: '是否可用',
            mobile: '手机号',
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
