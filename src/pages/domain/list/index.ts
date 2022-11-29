export default OakComponent({
    isList: true,
    entity: 'domain',
    projection: {
        id: 1,
        systemId: 1,
        url: 1,
        apiPath: 1,
        port: 1,
        protocol: 1,
    },
    filters: [
        {
            filter: ({ props }) => {
                if (props.systemId) {
                    return {
                        systemId: props.systemId,
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
                url: '/domain/detail',
                oakId: id,
                tab: 'detail',
            });
        },
        goUpdate(id: string,) {
            this.navigateTo({
                url: '/domain/upsert',
                oakId: id,
            });
        },
        goCreate() {
            const { width, systemId } = this.props;
            this.navigateTo({
                url: '/domain/upsert',
                systemId,
            });
        },
    },
});
