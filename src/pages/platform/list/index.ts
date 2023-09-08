export default OakComponent({
    isList: true,
    entity: 'platform',
    actions: ['update', 'create'],
    projection: {
        id: 1,
        name: 1,
        description: 1,
        config: 1,
        $$createAt$$: 1,
    },
    formData({ data }) {
        return {
            list: data,
        };
    },
    methods: {
        goDetail(id: string) {
            this.navigateTo({
                url: '/platform/detail',
                oakId: id,
                tab: 'detail',
            });
        },
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
        goCreate() {
            this.navigateTo({
                url: '/platform/upsert',
            });
        },
    },
});
