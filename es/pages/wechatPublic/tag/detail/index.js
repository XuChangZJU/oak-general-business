export default OakComponent({
    entity: 'wechatPublicTag',
    isList: false,
    projection: {
        id: 1,
        text: 1,
        wechatId: 1,
        sync: 1,
        syncAt: 1,
        applicationId: 1,
        iState: 1,
        $$createAt$$: 1,
        $$updateAt$$: 1,
        $$seq$$: 1,
        userWechatPublicTag$wechatPublicTag$$aggr: {
            $entity: 'userWechatPublicTag',
            data: {
                '#count-1': {
                    id: 1,
                },
            },
        },
    },
    formData({ data }) {
        return {
            list: data,
        };
    },
    actions: ['sync'],
    filters: [
        {
            filter() {
                const { applicationId } = this.props;
                return {
                    applicationId
                };
            }
        }
    ],
    properties: {
        applicationId: '',
    },
    methods: {
        async sync(name, wechatId) {
            // this.updateItem({}, id, 'sync');
            // await this.execute();
            const { applicationId } = this.props;
            if (wechatId) {
                await this.features.wechatPublicTag.createTag({ applicationId: applicationId, name });
            }
            else {
                await this.features.wechatPublicTag.editTag({ applicationId: applicationId, id: wechatId, name });
            }
            ;
            this.setMessage({
                type: 'success',
                content: '操作成功'
            });
        },
        async oneKeySync() {
            const { applicationId } = this.props;
            await this.features.wechatPublicTag.oneKeySync({ applicationId: applicationId });
            await this.refresh();
            this.setMessage({
                content: '同步成功',
                type: 'success'
            });
        },
        async deleteTag(id, wechatId) {
            const { applicationId } = this.props;
            await this.features.wechatPublicTag.deleteTag({ applicationId: applicationId, id, wechatId });
            await this.refresh();
            this.setMessage({
                content: '操作成功',
                type: 'success',
            });
        }
    }
});
