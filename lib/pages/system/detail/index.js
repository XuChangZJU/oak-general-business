"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    entity: 'system',
    projection: {
        id: 1,
        name: 1,
        config: 1,
        description: 1,
        super: 1,
        folder: 1,
        platformId: 1,
        platform: {
            id: 1,
            name: 1,
        },
        domain$system: {
            $entity: 'domain',
            data: {
                id: 1,
                systemId: 1,
                url: 1,
            },
        },
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
        onTabClick(key) {
            const { oakId } = this.props;
            this.redirectTo({
                url: '/system/detail',
                oakId,
                tab: key,
            });
        },
    },
});
