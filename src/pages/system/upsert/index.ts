export default OakComponent({
    isList: false,
    entity: 'system',
    projection: {
        id: 1,
        name: 1,
        config: 1,
        description: 1,
        folder: 1,
        super: 1,
        style: 1,
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
            await this.execute();
            this.navigateBack();
        }
    },
});
