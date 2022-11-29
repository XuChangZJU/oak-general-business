"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("oak-domain/lib/utils/validator");
var checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'application',
        checker: function (data, context) {
            var setData = function (data) {
                if (!data.config) {
                    Object.assign(data, {
                        config: {},
                    });
                }
            };
            if (data instanceof Array) {
                data.forEach(function (ele) {
                    (0, validator_1.checkAttributesNotNull)('application', ele, [
                        'name',
                        'type',
                        'systemId',
                    ]);
                    setData(ele);
                });
            }
            else {
                (0, validator_1.checkAttributesNotNull)('application', data, [
                    'name',
                    'type',
                    'systemId',
                ]);
                setData(data);
            }
            return 0;
        },
    },
];
exports.default = checkers;
