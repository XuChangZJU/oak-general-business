"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: true,
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        relationEntity: 1,
        relationEntityFilter: 1,
        relationIds: 1,
        type: 1,
        qrCodeType: 1,
        remark: 1,
        granterId: 1,
        granter: {
            id: 1,
            name: 1,
            nickname: 1,
        },
        granteeId: 1,
        $$createAt$$: 1,
        expired: 1,
        expiresAt: 1,
    },
    filters: [
        {
            filter() {
                return {
                    entity: this.props.entity,
                    entityId: this.props.entityId,
                };
            },
        },
    ],
    sorters: [
        {
            sorter: () => ({
                $attr: {
                    $$createAt$$: 1,
                },
                $direction: 'desc',
            }),
            '#name': 'default',
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
    methods: {},
});
