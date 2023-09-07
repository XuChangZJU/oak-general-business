"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("oak-domain/lib/utils/assert");
var validator_1 = require("oak-domain/lib/utils/validator");
var types_1 = require("oak-domain/lib/types");
var validator_2 = require("oak-domain/lib/utils/validator");
var checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'mobile',
        checker: function (data) {
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
        checker: function (data) {
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
