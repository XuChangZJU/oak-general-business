"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("oak-domain/lib/utils/validator");
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'system',
        checker: (data) => {
            const setData = (data) => {
                if (!data.config) {
                    Object.assign(data, {
                        config: {},
                    });
                }
                if (!data.super) {
                    Object.assign(data, {
                        super: false,
                    });
                }
            };
            if (data instanceof Array) {
                data.forEach((ele) => {
                    (0, validator_1.checkAttributesNotNull)('system', ele, ['name', 'platformId']);
                    setData(ele);
                });
            }
            else {
                (0, validator_1.checkAttributesNotNull)('system', data, ['name', 'platformId']);
                setData(data);
            }
            return;
        },
    },
];
exports.default = checkers;
