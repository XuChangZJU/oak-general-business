export default OakComponent({
    isList: true,
    entity: 'wechatUser',
    projection: {
        id: 1,
        origin: 1,
        openId: 1,
        unionId: 1,
        sessionKey: 1,
        accessToken: 1,
        refreshToken: 1,
        scope: 1,
        atExpiredAt: 1,
        rtExpiredAt: 1,
        subscribed: 1,
        subscribedAt: 1,
        applicationId: 1,
        userId: 1,
        remark: 1,
        language: 1,
        nickname: 1,
        avatar: 1,
        userWechatPublicTag$wechatUser: {
            $entity: 'userWechatPublicTag',
            data: {
                id: 1,
                sync: 1,
                syncAt: 1,
                wechatUserId: 1,
                wechatPublicTagId: 1,
                wechatPublicTag: {
                    id: 1,
                    wechatId: 1,
                    text: 1,
                },
                iState: 1,
            },
        },
    },
    filters: [
        {
            filter() {
                const { applicationId } = this.props;
                return {
                    applicationId,
                    origin: 'public',
                    subscribed: true
                };
            },
        }
    ],
    formData({ data: rows }) {
        const wechatUsers = rows?.map((ele) => {
            return {
                id: ele?.id,
                openId: ele?.openId,
                tags: ele?.userWechatPublicTag$wechatUser ? ele?.userWechatPublicTag$wechatUser?.map((ele) => ele.wechatPublicTag) : [],
                sync: ele?.userWechatPublicTag$wechatUser?.every((ele) => ele.iState === 'success'),
                nickname: ele?.nickname,
                avatar: ele?.avatar,
                subscribedAt: ele?.subscribedAt,
                remark: ele?.remark,
                language: ele?.language,
            };
        });
        return {
            wechatUsers,
        };
    },
    pagination: {
        pageSize: 10,
        currentPage: 1,
        more: true,
    },
    properties: {
        applicationId: '',
    },
    lifetimes: {},
    methods: {
        async getTags() {
            const { applicationId } = this.props;
            const { data: wechatPublicTags } = await this.features.cache.refresh('wechatPublicTag', {
                data: {
                    id: 1,
                    wechatId: 1,
                    text: 1,
                    sync: 1,
                    iState: 1,
                },
                filter: {
                    applicationId,
                    sync: true,
                    iState: 'success',
                },
            });
            this.setState({
                onlyone: false,
                tags: wechatPublicTags?.map((ele) => {
                    return {
                        value: ele.wechatId,
                        label: ele.text
                    };
                })
            });
        },
        async tagging(tagIdList, openId) {
            const { applicationId } = this.props;
            await this.features.userWechatPublicTag.tagging({ applicationId: applicationId, openId, tagIdList });
            await this.refresh();
            this.setMessage({
                content: '操作成功',
                type: 'success'
            });
        },
        async syncToLocale(openId) {
            const { applicationId } = this.props;
            await this.features.userWechatPublicTag.syncToLocale({ applicationId: applicationId, openId });
            await this.refresh();
            this.setMessage({
                content: '操作成功',
                type: 'success'
            });
        },
        // async syncToWechat(openId: string) {
        //     const { applicationId } = this.props;
        //     await this.features.userWechatPublicTag.syncToLocale({applicationId: applicationId!, openId});
        //     await this.refresh();
        //     this.setMessage({
        //         content: '操作成功',
        //         type: 'success'
        //     })
        // },
    },
});
