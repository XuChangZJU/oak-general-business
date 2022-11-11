"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    isList: true,
    entity: 'system',
    projection: {
        id: 1,
        name: 1,
        description: 1,
        config: 1,
        super: 1,
        platformId: 1,
    },
    filters: [
        {
            filter: function (_a) {
                var props = _a.props;
                return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_b) {
                        if (props.platformId) {
                            return [2 /*return*/, {
                                    platformId: props.platformId,
                                }];
                        }
                        return [2 /*return*/, {}];
                    });
                });
            },
        },
    ],
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
    data: {
        open: false,
    },
    methods: {
        goDetail: function (id) {
            this.navigateTo({
                url: '/system/detail',
                oakId: id,
            });
        },
        goUpdate: function (id) {
            this.navigateTo({
                url: '/system/upsert',
                oakId: id,
            });
        },
        goSetConfig: function (id) {
            this.navigateTo({
                url: '/system/config/upsert',
                oakId: id,
            });
        },
        goCreate: function () {
            var _a = this.props, width = _a.width, platformId = _a.platformId;
            if (width === 'xs') {
                this.navigateTo({
                    url: '/system/upsert',
                    platformId: platformId,
                });
                return;
            }
            this.setState({
                open: true,
            });
        },
    },
});
