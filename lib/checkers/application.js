"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var validator_1 = require("oak-domain/lib/utils/validator");
var checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'application',
        checker: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var action, data;
                return tslib_1.__generator(this, function (_b) {
                    action = operation.action, data = operation.data;
                    if (data instanceof Array) {
                        data.forEach(function (ele) {
                            (0, validator_1.checkAttributesNotNull)('application', ele, [
                                'name',
                                'type',
                                'systemId',
                            ]);
                        });
                    }
                    else {
                        (0, validator_1.checkAttributesNotNull)('application', data, [
                            'name',
                            'type',
                            'systemId',
                        ]);
                    }
                    return [2 /*return*/, 0];
                });
            });
        },
    },
];
exports.default = checkers;
