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
        style: 1,
    },
    formData({ data }) {
        return data || {};
    },
    data: {
        typeArr: [
            {
                value: 'web',
            },
            {
                value: 'wechatMp',
            },
            {
                value: 'wechatPublic',
            },
        ],
    },
    lifetimes: {
        ready() {
            const { systemId, oakId } = this.props;
            if (!oakId) {
                if (systemId) {
                    this.update({
                        systemId,
                    });
                }
            }
        },
    },
    methods: {
        async confirm() {
            await this.execute();
            this.navigateBack();
        },
    },
});
