export default OakComponent({
    isList: true,
    entity: 'system',
    actions: ['update'],
    projection: {
        id: 1,
        name: 1,
        description: 1,
        config: 1,
        super: 1,
        platformId: 1,
        domain$system: {
            $entity: 'domain',
            data: {
                id: 1,
                systemId: 1,
                url: 1,
            },
        },
    },
    filters: [
        {
            filter() {
                if (this.props.platformId) {
                    return {
                        platformId: this.props.platformId,
                    };
                }
                return {};
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
                url: '/system/detail',
                oakId: id,
                tab: 'detail',
            });
        },
        goUpdate(id: string) {
            this.navigateTo({
                url: '/system/upsert',
                oakId: id,
            });
        },
        goSetConfig(id: string) {
            this.navigateTo({
                url: '/system/config/upsert',
                oakId: id,
            });
        },
        goCreate() {
            const { width, platformId } = this.props;
            this.navigateTo({
                url: '/system/upsert',
                platformId,
            });
        },
    },
});
