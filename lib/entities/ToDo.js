"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
const IActionDef = {
    stm: {
        done: ['active', 'done'],
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
                action: '动作',
                redirectTo: '重定向页面',
            },
            r: {
                collaborator: '协作者',
            },
            action: {
                done: '完成',
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
