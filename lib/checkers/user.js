"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var actionDef_1 = require("oak-domain/lib/store/actionDef");
var types_1 = require("oak-domain/lib/types");
var checkers = [
    {
        type: 'data',
        action: 'remove',
        entity: 'user',
        checker: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var filter;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            filter = operation.filter;
                            return [4 /*yield*/, (0, actionDef_1.checkFilterContains)('user', context.rowStore.getSchema(), {
                                    idState: 'shadow',
                                }, context, filter)];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, 0];
                    }
                });
            });
        },
    },
    {
        type: 'user',
        action: 'play',
        entity: 'user',
        checker: function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // 只有root才能play
                throw new types_1.OakUserUnpermittedException();
            });
        }); },
    },
    {
        type: 'data',
        action: 'play',
        entity: 'user',
        checker: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var token, userId;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, context.getToken()];
                        case 1:
                            token = _b.sent();
                            userId = token.userId;
                            if (userId === operation.filter.id) {
                                throw new types_1.OakRowInconsistencyException();
                            }
                            return [2 /*return*/, 0];
                    }
                });
            });
        },
    },
    {
        type: 'data',
        action: 'grant',
        entity: 'user',
        checker: function (_a) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data;
                return tslib_1.__generator(this, function (_b) {
                    data = operation.data;
                    if (Object.keys(data).filter(function (ele) { return !ele.includes('$'); }).length > 0) {
                        throw new types_1.OakInputIllegalException('user', Object.keys(data), '授权不允许传入其它属性');
                    }
                    return [2 /*return*/, 0];
                });
            });
        }
    }
];
exports.default = checkers;
