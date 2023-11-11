"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("oak-domain/lib/utils/validator");
const types_1 = require("oak-domain/lib/types");
const checkers = [
    {
        type: 'data',
        action: 'update',
        entity: 'address',
        checker: (data) => {
            if (data.hasOwnProperty('phone') && !(0, validator_1.isMobile)(data.phone)) {
                throw new types_1.OakInputIllegalException('address', ['phone'], '手机号非法');
            }
            return;
        },
    }
];
exports.default = checkers;
