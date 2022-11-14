"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    isList: false,
    entity: 'platform',
    projection: {
        id: 1,
        name: 1,
        config: 1,
    },
    formData: function (_a) {
        var data = _a.data;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, data || {}];
            });
        });
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
                url: '/platform/detail',
                oakId: oakId,
                tab: key,
            });
        },
    },
});
