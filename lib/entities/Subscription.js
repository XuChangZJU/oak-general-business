"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
const entityDesc = {
    locales: {
        zh_CN: {
            name: '订阅号',
            attr: {
                name: '名称',
                entity: '对象名称',
                entityId: '对象Id',
                description: '描述',
                config: '配置',
                offset: '已同步素材位置',
            },
        },
    },
    indexes: [
        //索引
        {
            name: 'index_name',
            attributes: [
                {
                    name: 'name',
                },
            ],
        },
        {
            name: 'index_entity',
            attributes: [
                {
                    name: 'entity',
                },
                {
                    name: 'entityId',
                }
            ],
        },
    ]
};
