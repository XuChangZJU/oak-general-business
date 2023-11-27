"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("oak-domain/lib/utils/assert");
// import { wechatMpJump } from '@project/aspects/wechatMpJump';
const triggers = [
    {
        name: '当创建WechatMpJump时，尝试为之创建一个wechatQrCode',
        entity: 'wechatMpJump',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (wechatMpJumpData) => {
                const { jump_wxa, expiresAt, expireType, expireInterval } = wechatMpJumpData;
                Object.assign(wechatMpJumpData, {});
            };
            if (data instanceof Array) {
                (0, assert_1.assert)('授权不存在一对多的情况');
            }
            else {
                await fn(data);
            }
            return 0;
        },
    },
];
exports.default = triggers;
