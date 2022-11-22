"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("oak-domain/lib/utils/validator");
var checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'system',
        checker: function (data) {
            if (data instanceof Array) {
                data.forEach(function (ele) {
                    (0, validator_1.checkAttributesNotNull)('system', ele, ['name', 'platformId']);
                });
            }
            else {
                (0, validator_1.checkAttributesNotNull)('system', data, ['name', 'platformId']);
            }
            return 0;
        },
    },
];
exports.default = checkers;
