const entityDesc = {
    locales: {
        zh_CN: {
            name: '微信识别码',
            attr: {
                entity: '关联对象',
                entityId: '关联对象id',
                type: '类型',
                allowShare: '允许分享',
                tag: 'tag',
                tag2: 'tag2',
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
                    webForWechatPublic: '网站引流到公众号',
                    wechatMpDomainUrl: '小程序url码',
                    wechatMpWxaCode: '小程序码',
                    wechatPublic: '公众号关注码',
                    wechatPublicForMp: '公众号回复小程序码',
                }
            }
        },
    },
    indexes: [
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
    ]
};
export {};
