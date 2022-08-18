"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var indexes = [
    {
        name: 'index_entity_entityId',
        attributes: [
            {
                name: 'entity',
            },
            {
                name: 'entityId',
            },
        ],
    },
    {
        name: 'index_uuid',
        attributes: [
            {
                name: 'expired',
            },
            {
                name: 'expiresAt',
            }
        ],
    },
];
var locale = {
    zh_CN: {
        attr: {
            relation: '关系',
            entity: '关联对象',
            entityId: '关联对象id',
            type: '类型',
            number: '次数',
            confirmed: '已确认人数',
            remark: '备注',
            grantee: '领取人',
            granter: '授权人',
            files: '微信码',
            expired: '是否过期',
            expiresAt: '过期时间',
            iState: '状态',
        },
        action: {
            confirm: '确认'
        },
        v: {
            type: {
                grant: '授予',
                transfer: '转交',
            },
            iState: {
                init: '初始',
            },
        },
    },
};
