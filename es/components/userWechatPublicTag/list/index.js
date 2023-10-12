export default OakComponent({
    isList: true,
    entity: 'userWechatPublicTag',
    projection: {
        id: 1,
        wechatPublicTagId: 1,
        wechatPublicTag: {
            id: 1,
            wechatId: 1,
            text: 1,
        },
        wechatUserId: 1,
        wechatUser: {
            id: 1,
            openId: 1,
            applicationId: 1,
        },
        sync: 1,
        syncAt: 1,
        iState: 1,
    },
    filters: [
        {
            filter() {
                const { applicationId, openId } = this.props;
                return {
                    wechatUser: {
                        openId,
                        applicationId,
                    }
                };
            },
        }
    ],
    formData({ data: rows }) {
        const userWechatPublicTags = rows?.map((ele) => {
            return {
                id: ele?.id,
                text: ele?.wechatPublicTag?.text,
                wechatId: ele?.wechatPublicTag?.wechatId,
                openId: ele?.wechatUser?.openId,
                syncAt: ele?.syncAt,
                iState: ele?.iState,
            };
        });
        return {
            userWechatPublicTags,
        };
    },
    pagination: {
        pageSize: 10,
        currentPage: 1,
        more: true,
    },
    properties: {
        applicationId: '',
        openId: '',
    },
    lifetimes: {},
    methods: {
        async sync(id, openId) {
            const { applicationId } = this.props;
            await this.features.userWechatPublicTag.syncToWechat({ applicationId: applicationId, id, openId });
            await this.refresh();
            this.setMessage({
                type: 'success',
                content: '操作成功'
            });
        }
    },
});
