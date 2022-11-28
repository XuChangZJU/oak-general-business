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
        platformId: 1,
    },
    formData: function (_a) {
        var data = _a.data;
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
        attached: function () {
            this.setState({
                tabValue: this.props.tab,
            });
        },
    },
    methods: {
        onTabClick: function (key) {
            var oakId = this.props.oakId;
            this.redirectTo({
                url: '/system/detail',
                oakId: oakId,
                tab: key,
            });
        },
    },
});
