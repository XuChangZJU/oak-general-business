"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("oak-domain/lib/utils/validator");
var types_1 = require("oak-domain/lib/types");
var validator_2 = require("oak-domain/lib/utils/validator");
var checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'address',
        checker: function (data) {
            if (data instanceof Array) {
                data.forEach(function (ele) {
                    (0, validator_2.checkAttributesNotNull)('address', ele, ['name', 'detail', 'phone' /* , 'areaId' */]);
                    if (!(0, validator_1.isMobile)(ele.phone)) {
                        throw new types_1.OakInputIllegalException('address', ['phone'], '手机号非法');
                    }
                });
            }
            else {
                (0, validator_2.checkAttributesNotNull)('address', data, ['name', 'detail', 'phone' /* , 'areaId' */]);
                if (!(0, validator_1.isMobile)(data.phone)) {
                    throw new types_1.OakInputIllegalException('address', ['phone'], '手机号非法');
                }
            }
        },
    },
    {
        type: 'data',
        action: 'update',
        entity: 'address',
        checker: function (data) {
            if (data.name === '') {
                throw new types_1.OakInputIllegalException('address', ['name'], '姓名不可为空');
            }
            if (data.detail === '') {
                throw new types_1.OakInputIllegalException('address', ['name'], '详细地址不可为空');
            }
            if (data.hasOwnProperty('phone') && !(0, validator_1.isMobile)(data.phone)) {
                throw new types_1.OakInputIllegalException('address', ['phone'], '手机号非法');
            }
            return 0;
        },
    }
];
exports.default = checkers;
