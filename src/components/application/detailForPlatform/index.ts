export default OakComponent({
    isList: false,
    entity: 'application',
    projection: {
        id: 1,
        name: 1,
        config: 1,
        description: 1,
        type: 1,
        systemId: 1,
        system: {
            id: 1,
            name: 1,
        },
    },
    formData({ data }) {
        return data || {};
    },
    methods: {
        goWechatPublicTagList() {
            const { oakId } = this.props;
            this.navigateTo({
                url: '/wechatPublic/tag/list',
                applicationId: oakId,
            })
        }
    },
});
