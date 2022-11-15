export default OakComponent({
    isList: true,
    entity: 'application',
    projection: {
        id: 1,
        name: 1,
        description: 1,
        config: 1,
        systemId: 1,
        type: 1,
    },
    filters: [
        {
            filter: async ({ props }) => {
                if (props.systemId) {
                    return {
                        systemId: props.systemId,
                    };
                }
                return {};
            },
        },
    ],
    async formData({ data }) {
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
                url: '/application/detail',
                oakId: id,
            });
        },
        goUpdate(id: string) {
            this.navigateTo({
                url: '/application/upsert',
                oakId: id,
            });
        },
        goSetConfig(id: string) {
            this.navigateTo({
                url: '/application/config/upsert',
                oakId: id,
            });
        },
        goCreate() {
            const { width, systemId } = this.props;
            // if (width === 'xs') {
            //     this.navigateTo({
            //         url: '/application/upsert',
            //     });
            //     return;
            // }
            // this.setState({
            //     open: true,
            // });
            this.navigateTo({
                url: '/application/upsert',
                systemId,
            });
        },
        removeApplication(id: string) {
            this.execute({
                action: 'remove',
                data: {},
                filter: {
                    id
                }
            })
        },
    },
});
