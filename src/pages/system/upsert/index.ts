export default OakComponent({
    isList: false,
    entity: 'system',
    projection: {
        id: 1,
        name: 1,
        config: 1,
        description: 1,
        super: 1,
        domain: 1
    },
    formData({ data }) {
        return data || {};
    },
    lifetimes: {
        ready() {
            const { platformId, oakId } = this.props;

            if (!oakId) {
                if (platformId) {
                    this.update({ platformId });
                }
            }
        },
    },
    methods: {
        async confirm() {
            const { domain } = this.state;
            if (!domain) {
                this.setMessage({
                    type: 'warning',
                    content: '访问域名必须设置'
                })
                return;

            };
            await this.execute();
            this.navigateBack();
        }
    },
});
