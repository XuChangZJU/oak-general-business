"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
var validator_1 = require("oak-domain/lib/utils/validator");
var checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'messageTypeTemplateId',
        checker: function (data, context) {
            (0, assert_1.default)(!(data instanceof Array));
            (0, validator_1.checkAttributesNotNull)('messageTypeTemplateId', data, ['type', 'templateId', 'applicationId']);
        }
    }
];
exports.default = checkers;
