"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var indexes = [
    {
        name: 'index_entity_entityId_tag',
        attributes: [
            {
                name: 'entity',
            },
            {
                name: 'entityId',
            },
            {
                name: 'tag',
            }
        ],
    },
    {
        name: 'index_expired_expiresAt',
        attributes: [
            {
                name: 'expired',
            },
            {
                name: 'expiresAt',
            },
        ],
    },
    {
        name: 'index_url',
        attributes: [
            {
                name: 'url',
            },
        ],
    },
];
var locale = {
    zh_CN: {
        attr: {
            entity: '关联对象',
            entityId: '关联对象id',
            type: '类型',
            allowShare: '允许分享',
            tag: 'tag',
            ticket: 'ticket',
            url: 'url',
            permanent: '是否永久码',
            buffer: '小程序码数据（动态）',
            expired: '是否过期',
            expiresAt: '过期时间',
            application: '应用',
            props: '属性',
        },
        v: {
            type: {
                wechatMpDomainUrl: '小程序域名跳转',
                wechatMpWxaCode: '小程序码',
                wechatPublic: '公众号码',
                wechatPublicForMp: '公众号跳小程序',
            }
        }
    },
};
