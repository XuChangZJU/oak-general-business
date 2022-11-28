"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: true,
    entity: 'platform',
    projection: {
        id: 1,
        name: 1,
        description: 1,
        config: 1,
        $$createAt$$: 1,
    },
    formData: function (_a) {
        var data = _a.data;
        var pagination = this.getPagination();
        return {
            list: data,
            pagination: pagination,
        };
    },
    methods: {
        goDetail: function (id) {
            this.navigateTo({
                url: '/platform/detail',
                oakId: id,
                tab: 'detail',
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
        goCreate: function () {
            this.navigateTo({
                url: '/platform/upsert',
            });
        },
    },
});
