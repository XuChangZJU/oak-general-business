"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    isList: true,
    entity: 'platform',
    projection: {
        id: 1,
        name: 1,
        description: 1,
        config: 1,
    },
    formData: function (_a) {
        var data = _a.data;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var pagination;
            return tslib_1.__generator(this, function (_b) {
                pagination = this.getPagination();
                return [2 /*return*/, {
                        list: data,
                        pagination: pagination,
                    }];
            });
        });
    },
    methods: {
        goDetail: function (id) {
            this.navigateTo({
                url: '/platform/detail',
                oakId: id,
            });
        },
        goUpdate: function (id) {
            this.navigateTo({
                url: '/platform/upsert',
                oakId: id,
            });
        },
        goSetConfig: function (id) {
            this.navigateTo({
                url: '/platform/config/upsert',
                oakId: id,
            });
        },
        goNewPlatform: function () {
            this.navigateTo({
                url: '/platform/upsert',
            });
        },
    },
});
