export default OakComponent({
    isList: true,
    entity: 'subscription',
    projection: {
        id: 1,
        name: 1,
        description: 1,
        config: 1,
        entity: 1,
        entityId: 1,
    },
    filters: [
        {
            filter() {
                return {
                    entityId: this.props.entityId,
                    entity: this.props.entity,
                };
            },
        },
    ],
    formData({ data }) {
        const pagination = this.getPagination();
        return {
            list: data,
            pagination,
        };
    },
    data: {
        open: false,
    },
    methods: {
        goDetail(id: string) {
            this.navigateTo({
                url: '/subscription/detail',
                oakId: id,
            });
        },
        goUpdate(id: string) {
            this.navigateTo({
                url: '/subscription/upsert',
                oakId: id,
            });
        },
        goSetConfig(id: string) {
            this.navigateTo({
                url: '/subscription/config/upsert',
                oakId: id,
            });
        },
        goCreate() {
            const { width, entityId, entity } = this.props;
            this.navigateTo({
                url: '/subscription/upsert',
                entityId,
                entity,
            });
        },
        remove(id: string) {
            this.removeItem(id);
            this.execute();
        },
    },
});
