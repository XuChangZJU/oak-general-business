const entityDesc = {
    locales: {
        zh_CN: {
            name: '短信跳小程序',
            attr: {
                message: '消息',
                expired: '是否过期',
                jump_wxa: '目标小程序信息',
                openlink: "目标链接及参数",
                expireType: '失效类型',
                expireInterval: '到期失效的间隔',
                expiresAt: '过期时间',
            },
        },
    },
    indexes: [
        {
            name: 'index_uuid',
            attributes: [
                {
                    name: 'expired',
                },
                {
                    name: 'expiresAt',
                },
            ],
        },
    ],
};
export {};
