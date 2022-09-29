export default OakPage({
    isList: true,
    entity: 'platform',
    projection: {
        id: 1,
        name: 1,
        description: 1,
        config: 1,
    },
    async formData({ data }) {
        const pagination = this.getPagination();
        return {
            list: data,
            pagination,
        };
    },
    methods: {
        goUpdate(id: string) {
            this.navigateTo({
                url: '/platform/upsert',
                oakId: id,
            });
        },
        goSetConfig(id: string) {
            this.navigateTo({
                url: '/platform/config/upsert',
                oakId: id,
            });
        },
        goNewPlatform() {
            this.navigateTo({
                url: '/platform/upsert',
            });
        }
    },
});
