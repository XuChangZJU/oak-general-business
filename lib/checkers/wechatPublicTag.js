"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
var validator_1 = require("oak-domain/lib/utils/validator");
var checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'wechatPublicTag',
        checker: function (data) {
            (0, assert_1.default)(!(data instanceof Array));
            (0, validator_1.checkAttributesNotNull)('wechatPublicTag', data, ['applicationId', 'text']);
            (0, validator_1.checkAttributesScope)('wechatPublicTag', data, ['applicationId', 'id', 'text']);
        },
    },
];
