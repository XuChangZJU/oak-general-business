export default OakComponent({
    isList: false,
    entity: 'system',
    projection: {
        id: 1,
        name: 1,
        config: 1,
        description: 1,
        super: 1,
        platformId: 1,
    },
    async formData({ data }) {
        return data || {};
    },
    observers: {
        tab: function (tab) {
            this.setState({
                tabValue: tab,
            });
        },
    },
    lifetimes: {
        attached() {
            this.setState({
                tabValue: this.props.tab,
            });
        },
    },
    methods: {
        onTabClick(key: 'detail' | 'application_list') {
            const { oakId } = this.props;
            this.redirectTo({
                url: '/system/detail',
                oakId,
                tab: key,
            });
        },
    },
});
