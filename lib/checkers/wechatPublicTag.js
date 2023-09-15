"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("oak-domain/lib/utils/assert");
const validator_1 = require("oak-domain/lib/utils/validator");
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'wechatPublicTag',
        checker: (data) => {
            (0, assert_1.assert)(!(data instanceof Array));
            (0, validator_1.checkAttributesNotNull)('wechatPublicTag', data, [
                'applicationId',
                'text',
            ]);
            (0, validator_1.checkAttributesScope)('wechatPublicTag', data, [
                'applicationId',
                'id',
                'text',
            ]);
        },
    },
];
exports.default = checkers;
