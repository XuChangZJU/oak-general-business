"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: true,
    entity: 'domain',
    actions: ['update', 'create'],
    projection: {
        id: 1,
        systemId: 1,
        url: 1,
        apiPath: 1,
        port: 1,
        protocol: 1,
    },
    filters: [
        {
            filter: function () {
                if (this.props.systemId) {
                    return {
                        systemId: this.props.systemId,
                    };
                }
                return {};
            },
        },
    ],
    formData: function (_a) {
        var data = _a.data;
        return {
            list: data,
        };
    },
    data: {
        open: false,
    },
    methods: {
        goDetail: function (id) {
            this.navigateTo({
                url: '/domain/detail',
                oakId: id,
                tab: 'detail',
            });
        },
        goUpdate: function (id) {
            this.navigateTo({
                url: '/domain/upsert',
                oakId: id,
            });
        },
        goCreate: function () {
            var _a = this.props, width = _a.width, systemId = _a.systemId;
            this.navigateTo({
                url: '/domain/upsert',
                systemId: systemId,
            });
        },
    },
});
