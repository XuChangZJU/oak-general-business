"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const validator_1 = require("oak-domain/lib/utils/validator");
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'messageTypeTemplateId',
        checker: (data, context) => {
            (0, assert_1.default)(!(data instanceof Array));
            (0, validator_1.checkAttributesNotNull)('messageTypeTemplateId', data, ['type', 'templateId', 'applicationId']);
        }
    }
];
exports.default = checkers;
