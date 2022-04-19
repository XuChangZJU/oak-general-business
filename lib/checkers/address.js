"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("oak-domain/lib/utils/validator");
const types_1 = require("oak-domain/lib/types");
const check_1 = require("../utils/check");
const checkers = [
    {
        action: 'create',
        entity: 'address',
        checker: async ({ operation }) => {
            const { action, data } = operation;
            if (data instanceof Array) {
                data.forEach(ele => {
                    const a = 'name';
                    (0, check_1.checkAttributesNotNull)(ele, ['name', 'detail', 'phone', 'areaId']);
                    if (!(0, validator_1.isMobile)(ele.phone)) {
                        throw new types_1.AttrIllegalError(['phone'], '手机号非法');
                    }
                });
            }
            else {
                (0, check_1.checkAttributesNotNull)(data, ['name', 'detail', 'phone', 'areaId']);
                if (!(0, validator_1.isMobile)(data.phone)) {
                    throw new types_1.AttrIllegalError(['phone'], '手机号非法');
                }
            }
            return 0;
        },
    }
];
exports.default = checkers;
