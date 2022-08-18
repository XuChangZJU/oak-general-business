"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var validator_1 = require("oak-domain/lib/utils/validator");
var types_1 = require("oak-domain/lib/types");
var validator_2 = require("oak-domain/lib/utils/validator");
var checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'address',
        checker: function (_a) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var action, data;
                return tslib_1.__generator(this, function (_b) {
                    action = operation.action, data = operation.data;
                    if (data instanceof Array) {
                        data.forEach(function (ele) {
                            var a = 'name';
                            (0, validator_2.checkAttributesNotNull)(ele, ['name', 'detail', 'phone', 'areaId']);
                            if (!(0, validator_1.isMobile)(ele.phone)) {
                                throw new types_1.OakInputIllegalException(['phone'], '手机号非法');
                            }
                        });
                    }
                    else {
                        (0, validator_2.checkAttributesNotNull)(data, ['name', 'detail', 'phone', 'areaId']);
                        if (!(0, validator_1.isMobile)(data.phone)) {
                            throw new types_1.OakInputIllegalException(['phone'], '手机号非法');
                        }
                    }
                    return [2 /*return*/, 0];
                });
            });
        },
    }
];
exports.default = checkers;
