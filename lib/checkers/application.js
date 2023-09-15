"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("oak-domain/lib/utils/validator");
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'application',
        checker: (data, context) => {
            const setData = (data) => {
                if (!data.config) {
                    Object.assign(data, {
                        config: {},
                    });
                }
            };
            if (data instanceof Array) {
                data.forEach((ele) => {
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
            return;
        },
    },
];
exports.default = checkers;
