export default OakComponent({
    entity: 'wechatPublicTag',
    isList: true,
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
        async sync(id) {
            const { applicationId } = this.props;
            await this.features.wechatPublicTag.syncTag({ applicationId: applicationId, id });
            await this.refresh();
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
        async deleteTag(id) {
            this.removeItem(id);
            await this.execute();
        }
    }
});
