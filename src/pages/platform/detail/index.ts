export default OakComponent({
    isList: false,
    entity: 'platform',
    projection: {
        id: 1,
        name: 1,
        config: 1,
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
        onTabClick(key: 'detail' | 'system_list') {
            const { oakId } = this.props;
            this.redirectTo({
                url: '/platform/detail',
                oakId,
                tab: key,
            });
        },
    },
});
