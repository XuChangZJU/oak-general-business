"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: true,
    entity: 'system',
    actions: ['update'],
    projection: {
        id: 1,
        name: 1,
        description: 1,
        config: 1,
        super: 1,
        platformId: 1,
        domain$system: {
            $entity: 'domain',
            data: {
                id: 1,
                systemId: 1,
                url: 1,
            },
        },
    },
    filters: [
        {
            filter: function () {
                if (this.props.platformId) {
                    return {
                        platformId: this.props.platformId,
                    };
                }
                return {};
            },
        },
    ],
    formData: function (_a) {
        var data = _a.data;
        var pagination = this.getPagination();
        return {
            list: data,
            pagination: pagination,
        };
    },
    data: {
        open: false,
    },
    methods: {
        goDetail: function (id) {
            this.navigateTo({
                url: '/system/detail',
                oakId: id,
                tab: 'detail',
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
            this.navigateTo({
                url: '/system/upsert',
                platformId: platformId,
            });
        },
    },
});
