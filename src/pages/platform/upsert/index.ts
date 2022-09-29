export default OakPage({
    isList: false,
    entity: 'platform',
    projection: {
        id: 1,
        name: 1,
        config: 1,
        description: 1,
    },
    async formData({ data }) {
        return data || {};
    },
    methods: {
        async confirm() {
            await this.execute(this.props.oakId ? 'update' : 'create');
            this.navigateBack();
        }
    },
});
