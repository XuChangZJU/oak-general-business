"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    entity: 'domain',
    projection: {
        id: 1,
        systemId: 1,
        system: {
            id: 1,
            name: 1,
        },
        url: 1,
        apiPath: 1,
        port: 1,
        protocol: 1,
    },
    formData({ data }) {
        return data || {};
    },
    listeners: {
        tab: function (prev, next) {
            if (prev.tab !== next.tab) {
                this.setState({
                    tabValue: next.tab,
                });
            }
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
        onTabClick(key) { },
    },
});
