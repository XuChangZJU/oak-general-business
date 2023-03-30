"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: true,
    entity: 'subscription',
    projection: {
        id: 1,
        name: 1,
        description: 1,
        config: 1,
        entity: 1,
        entityId: 1,
    },
    properties: {
        entityId: String,
        entity: String,
    },
    filters: [
        {
            filter: function () {
                return {
                    entityId: this.props.entityId,
                    entity: this.props.entity,
                };
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
                url: '/subscription/detail',
                oakId: id,
            });
        },
        goUpdate: function (id) {
            this.navigateTo({
                url: '/subscription/upsert',
                oakId: id,
            });
        },
        goSetConfig: function (id) {
            this.navigateTo({
                url: '/subscription/config/upsert',
                oakId: id,
            });
        },
        goCreate: function () {
            var _a = this.props, entityId = _a.entityId, entity = _a.entity;
            this.navigateTo({
                url: '/subscription/upsert',
                entityId: entityId,
                entity: entity,
            });
        },
        remove: function (id) {
            this.removeItem(id);
            this.execute();
        },
    },
});
