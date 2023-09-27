;
const entityDesc = {
    locales: {
        zh_CN: {
            name: '公众号标签',
            attr: {
                text: 'tag名',
                application: '关联应用',
                wechatId: '微信端id',
                sync: '同步状态',
                syncAt: '同步时间',
            },
            action: {
                sync: '同步'
            }
        },
    },
    indexes: [
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
    ],
};
export {};
