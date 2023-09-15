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
            filter() {
                if (this.props.systemId) {
                    return {
                        systemId: this.props.systemId,
                    };
                }
                return {};
            },
        },
    ],
    formData({ data }) {
        return {
            list: data,
        };
    },
    data: {
        open: false,
    },
    methods: {
        goDetail(id) {
            this.navigateTo({
                url: '/domain/detail',
                oakId: id,
                tab: 'detail',
            });
        },
        goUpdate(id) {
            this.navigateTo({
                url: '/domain/upsert',
                oakId: id,
            });
        },
        goCreate() {
            const { width, systemId } = this.props;
            this.navigateTo({
                url: '/domain/upsert',
                systemId,
            });
        },
    },
});
