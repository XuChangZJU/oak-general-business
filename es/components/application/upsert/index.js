export default OakComponent({
    isList: false,
    entity: 'application',
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
    /* lifetimes: {
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
    }, */
});
