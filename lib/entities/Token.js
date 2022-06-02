"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("oak-domain/lib/actions/action");
;
const AbleActionDef = (0, action_1.makeAbleActionDef)('enabled');
const locale = {
    zh_CN: {
        attr: {
            application: '应用',
            entity: '关联对象',
            entityId: '关联对象id',
            user: '用户',
            player: '扮演者',
            env: '环境',
        },
        action: {
            enable: '激活',
            disable: '禁用',
        }
    },
};
