"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("oak-domain/lib/types");
const validator_1 = require("oak-domain/lib/utils/validator");
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'userEntityGrant',
        checker: async ({ operation }, context) => {
            const { data } = operation;
            if (data instanceof Array) {
                data.forEach(ele => {
                    (0, validator_1.checkAttributesNotNull)(ele, ['type', 'entity', 'entityId', 'relation']);
                    if (!ele.hasOwnProperty('number') || ele.type === 'transfer') {
                        Object.assign(ele, {
                            number: 1,
                        });
                    }
                    else {
                        if (ele.number <= 0) {
                            throw new types_1.OakInputIllegalException(['number', '分享的权限数量必须大于0']);
                        }
                    }
                    Object.assign(ele, {
                        confirmed: 0,
                    });
                });
            }
            else {
                (0, validator_1.checkAttributesNotNull)(data, ['type', 'entity', 'entityId', 'relation']);
                if (!data.hasOwnProperty('number') || data.type === 'transfer') {
                    Object.assign(data, {
                        number: 1,
                    });
                }
                else {
                    if (data.number <= 0) {
                        throw new types_1.OakInputIllegalException(['number', '分享的权限数量必须大于0']);
                    }
                }
                Object.assign(data, {
                    confirmed: 0,
                });
            }
            return 0;
        },
    },
];
exports.default = checkers;
