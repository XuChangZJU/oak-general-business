"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IActionDef = {
    stm: {
        online: ['offline', 'online'],
        offline: ['online', 'offline'],
        disabled: [['online', 'offline'], 'disabled'],
    },
    is: 'offline',
};
var entityDesc = {
    locales: {
        zh_CN: {
            name: '文章',
            attr: {
                title: '标题',
                author: '作者',
                abstract: '简介',
                content: '正文',
                files: '封面图',
                iState: '状态',
                url: '外部链接',
                entity: '关联对象',
                entityId: '关联对象id',
                sign: '唯一标志',
            },
            action: {
                online: '上架',
                offline: '下架',
                disabled: '禁用',
            },
            v: {
                iState: {
                    online: '已上架',
                    offline: '已下架',
                    disabled: '已禁用',
                },
            },
        },
    },
};
