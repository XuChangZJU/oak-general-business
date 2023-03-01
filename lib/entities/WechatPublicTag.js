"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var indexes = [
    {
        name: 'index_text_application',
        attributes: [
            {
                name: 'text',
            },
            {
                name: 'application',
            },
        ],
        config: {
            unique: true,
        },
    },
];
var locale = {
    zh_CN: {
        name: '公众号标签',
        attr: {
            text: 'tag名',
            application: '关联应用',
            wechatId: '微信端id',
            sync: '同步状态',
            syncAt: '同步时间',
        },
    },
};
