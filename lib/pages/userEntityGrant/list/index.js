"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    isList: true,
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relation: 1,
        type: 1,
        remark: 1,
        granterId: 1,
        number: 1,
        confirmed: 1,
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
            filter: function (_a) {
                var props = _a.props;
                return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_b) {
                        return [2 /*return*/, {
                                entity: props.entity,
                                entityId: props.entityId,
                            }];
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
    methods: {},
});
