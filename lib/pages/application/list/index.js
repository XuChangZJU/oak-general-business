"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: true,
    entity: 'application',
    projection: {
        id: 1,
        name: 1,
        description: 1,
        config: 1,
        systemId: 1,
        type: 1,
    },
    filters: [
        {
            filter: function (_a) {
                var props = _a.props;
                if (props.systemId) {
                    return {
                        systemId: props.systemId,
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
                url: '/application/detail',
                oakId: id,
            });
        },
        goUpdate: function (id) {
            this.navigateTo({
                url: '/application/upsert',
                oakId: id,
            });
        },
        goSetConfig: function (id) {
            this.navigateTo({
                url: '/application/config/upsert',
                oakId: id,
            });
        },
        goCreate: function () {
            var _a = this.props, width = _a.width, systemId = _a.systemId;
            // if (width === 'xs') {
            //     this.navigateTo({
            //         url: '/application/upsert',
            //     });
            //     return;
            // }
            // this.setState({
            //     open: true,
            // });
            this.navigateTo({
                url: '/application/upsert',
                systemId: systemId,
            });
        },
        removeApplication: function (id) {
            this.removeItem(id);
        },
    },
});
