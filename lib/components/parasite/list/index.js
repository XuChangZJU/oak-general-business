"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: true,
    entity: 'parasite',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        $$createAt$$: 1,
        expired: 1,
        expiresAt: 1,
        userId: 1,
        user: {
            id: 1,
            nickname: 1,
        }
    },
    actions: [
        'cancel'
    ],
    properties: {
        entity: '',
        entityId: '',
    },
    filters: [
        {
            filter: function () {
                return {
                    entity: this.props.entity,
                    entityId: this.props.entityId || 'illegal',
                };
            },
        },
    ],
    sorters: [
        {
            sorter: {
                $attr: {
                    $$createAt$$: 1,
                },
                $direction: 'desc',
            },
            '#name': 'default',
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
    methods: {},
});
