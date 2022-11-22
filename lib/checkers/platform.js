"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("oak-domain/lib/utils/validator");
var checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'platform',
        checker: function (data) {
            if (data instanceof Array) {
                data.forEach(function (ele) {
                    (0, validator_1.checkAttributesNotNull)('platform', ele, [
                        'name',
                    ]);
                });
            }
            else {
                (0, validator_1.checkAttributesNotNull)('platform', data, [
                    'name',
                ]);
            }
            return 0;
        },
    },
];
exports.default = checkers;
