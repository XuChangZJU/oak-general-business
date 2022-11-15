"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
var validator_1 = require("oak-domain/lib/utils/validator");
var checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'userEntityGrant',
        checker: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data;
                return tslib_1.__generator(this, function (_b) {
                    data = operation.data;
                    if (data instanceof Array) {
                        data.forEach(function (ele) {
                            (0, validator_1.checkAttributesNotNull)('userEntityGrant', ele, [
                                'type',
                                'entity',
                                'entityId',
                                'relation',
                            ]);
                            if (ele.type === 'grant') {
                                (0, validator_1.checkAttributesNotNull)('userEntityGrant', ele, [
                                    'number',
                                ]);
                                if (ele.number <= 0) {
                                    throw new types_1.OakInputIllegalException('userEntityGrant', ['number', '分享的权限数量必须大于0']);
                                }
                            }
                            Object.assign(ele, {
                                confirmed: 0,
                            });
                        });
                    }
                    else {
                        (0, validator_1.checkAttributesNotNull)('userEntityGrant', data, [
                            'type',
                            'entity',
                            'entityId',
                            'relation',
                        ]);
                        if (data.type === 'grant') {
                            (0, validator_1.checkAttributesNotNull)('userEntityGrant', data, ['number']);
                            if (data.number <= 0) {
                                throw new types_1.OakInputIllegalException('userEntityGrant', [
                                    'number',
                                    '分享的权限数量必须大于0',
                                ]);
                            }
                        }
                        Object.assign(data, {
                            confirmed: 0,
                        });
                    }
                    return [2 /*return*/, 0];
                });
            });
        },
    },
    {
        type: 'row',
        entity: 'userEntityGrant',
        action: ['disable'],
        checker: function (event, context, params) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var filter, rowStore, _a, userEntityGrant;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        filter = event.operation.filter;
                        rowStore = context.rowStore;
                        return [4 /*yield*/, rowStore.select('userEntityGrant', {
                                data: {
                                    id: 1,
                                    expired: 1,
                                },
                                filter: {
                                    id: filter === null || filter === void 0 ? void 0 : filter.id,
                                },
                                indexFrom: 0,
                                count: 1,
                            }, context, params)];
                    case 1:
                        _a = tslib_1.__read.apply(void 0, [(_b.sent()).result, 1]), userEntityGrant = _a[0];
                        if (!(userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.expired)) {
                            return [2 /*return*/, 1];
                        }
                        else {
                            throw new types_1.OakUserUnpermittedException();
                        }
                        return [2 /*return*/];
                }
            });
        }); },
    },
];
exports.default = checkers;
