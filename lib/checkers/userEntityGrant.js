"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("oak-domain/lib/types");
var validator_1 = require("oak-domain/lib/utils/validator");
var checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'userEntityGrant',
        checker: function (data) {
            if (data instanceof Array) {
                data.forEach(function (ele) {
                    (0, validator_1.checkAttributesNotNull)('userEntityGrant', ele, ['type', 'entity', 'entityId', 'relation']);
                    if (ele.type === 'grant') {
                        (0, validator_1.checkAttributesNotNull)('userEntityGrant', ele, ['number']);
                        if (ele.number <= 0) {
                            throw new types_1.OakInputIllegalException('userEntityGrant', ['number', '分享的权限数量必须大于0']);
                        }
                    }
                    Object.assign(ele, {
                        confirmed: 0,
                    });
                });
            }
            else {
                (0, validator_1.checkAttributesNotNull)('userEntityGrant', data, ['type', 'entity', 'entityId', 'relation']);
                if (data.type === 'grant') {
                    (0, validator_1.checkAttributesNotNull)('userEntityGrant', data, ['number']);
                    if (data.number <= 0) {
                        throw new types_1.OakInputIllegalException('userEntityGrant', ['number', '分享的权限数量必须大于0']);
                    }
                }
                Object.assign(data, {
                    confirmed: 0,
                });
            }
        },
    }
];
exports.default = checkers;
