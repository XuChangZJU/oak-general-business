export default OakComponent({
    isList: false,
    entity: 'domain',
    projection: {
        id: 1,
        systemId: 1,
        url: 1,
        apiPath: 1,
        port: 1,
        protocol: 1,
    },
    formData({ data }) {
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
        onTabClick(key: 'detail') {

        },
    },
});
