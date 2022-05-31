"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("oak-domain/lib/utils/validator");
const lodash_1 = require("lodash");
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'userEntityGrant',
        checker: async ({ operation }, context) => {
            const { data } = operation;
            if (data instanceof Array) {
                data.forEach(ele => {
                    (0, validator_1.checkAttributesNotNull)(ele, ['action', 'entity', 'entityId', 'relation']);
                    if (!ele.hasOwnProperty('number')) {
                        (0, lodash_1.assign)(ele, {
                            number: 1,
                        });
                    }
                    (0, lodash_1.assign)(ele, {
                        confirmed: 0,
                    });
                });
            }
            else {
                (0, validator_1.checkAttributesNotNull)(data, []);
                if (!data.hasOwnProperty('number')) {
                    (0, lodash_1.assign)(data, {
                        number: 1,
                    });
                }
                (0, lodash_1.assign)(data, {
                    confirmed: 0,
                });
            }
            return 0;
        },
    },
];
exports.default = checkers;
