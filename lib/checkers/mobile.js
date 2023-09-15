"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("oak-domain/lib/utils/assert");
const validator_1 = require("oak-domain/lib/utils/validator");
const types_1 = require("oak-domain/lib/types");
const validator_2 = require("oak-domain/lib/utils/validator");
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'mobile',
        checker: (data) => {
            (0, assert_1.assert)(!(data instanceof Array));
            (0, validator_2.checkAttributesNotNull)('mobile', data, ['mobile']);
            if (!(0, validator_1.isMobile)(data.mobile)) {
                throw new types_1.OakInputIllegalException('mobile', ['mobile'], '手机号非法');
            }
        },
    },
    {
        type: 'data',
        action: 'update',
        entity: 'mobile',
        checker: (data) => {
            (0, assert_1.assert)(!(data instanceof Array));
            if (data.hasOwnProperty('mobile')) {
                (0, validator_2.checkAttributesNotNull)('mobile', data, ['mobile']);
                if (!(0, validator_1.isMobile)(data.mobile)) {
                    throw new types_1.OakInputIllegalException('mobile', ['mobile'], '手机号非法');
                }
            }
        },
    },
];
exports.default = checkers;
