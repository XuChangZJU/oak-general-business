"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: true,
    entity: 'platform',
    actions: ['update', 'create'],
    projection: {
        id: 1,
        name: 1,
        description: 1,
        config: 1,
        $$createAt$$: 1,
    },
    formData({ data }) {
        return {
            list: data,
        };
    },
    methods: {
        goDetail(id) {
            this.navigateTo({
                url: '/platform/detail',
                oakId: id,
                tab: 'detail',
            });
        },
        goUpdate(id) {
            this.navigateTo({
                url: '/platform/upsert',
                oakId: id,
            });
        },
        goSetConfig(id) {
            this.navigateTo({
                url: '/platform/config/upsert',
                oakId: id,
            });
        },
        goCreate() {
            this.navigateTo({
                url: '/platform/upsert',
            });
        },
    },
});
