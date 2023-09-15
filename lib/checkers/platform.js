"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("oak-domain/lib/utils/validator");
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'platform',
        checker: (data) => {
            const setData = (data) => {
                if (!data.config) {
                    Object.assign(data, {
                        config: {},
                    });
                }
            };
            if (data instanceof Array) {
                data.forEach((ele) => {
                    (0, validator_1.checkAttributesNotNull)('platform', ele, ['name']);
                    setData(ele);
                });
            }
            else {
                (0, validator_1.checkAttributesNotNull)('platform', data, ['name']);
                setData(data);
            }
            return;
        },
    },
];
exports.default = checkers;
