export default OakComponent({
    isList: false,
    entity: 'platform',
    projection: {
        id: 1,
        name: 1,
        config: 1,
        description: 1,
    },
    formData({ data }) {
        return data || {};
    },
    methods: {
        async confirm() {
            await this.execute();
            this.navigateBack();
        }
    },
});
