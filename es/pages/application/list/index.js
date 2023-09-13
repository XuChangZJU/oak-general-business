export default OakComponent({
    isList: true,
    entity: 'application',
    actions: ['update', 'remove', 'create'],
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
            filter() {
                if (this.props.systemId) {
                    return {
                        systemId: this.props.systemId,
                    };
                }
                return {};
            },
        },
    ],
    formData({ data }) {
        return {
            list: data,
        };
    },
    data: {
        open: false,
    },
    methods: {
        goDetail(id) {
            this.navigateTo({
                url: '/application/detail',
                oakId: id,
            });
        },
        goUpdate(id) {
            this.navigateTo({
                url: '/application/upsert',
                oakId: id,
            });
        },
        goSetConfig(id) {
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
        removeApplication(id) {
            this.removeItem(id);
            this.execute();
        },
    },
});
