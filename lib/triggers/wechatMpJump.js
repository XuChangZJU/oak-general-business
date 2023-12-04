"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("oak-domain/lib/utils/assert");
const wechatMpJump_1 = require("../aspects/wechatMpJump");
const triggers = [
    {
        name: '当创建WechatMpJump时，生成openlink',
        entity: 'wechatMpJump',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (wechatMpJumpData) => {
                const { jump_wxa, expiresAt, expireType, expireInterval } = wechatMpJumpData;
                const applicationId = context.getApplicationId();
                (0, assert_1.assert)(applicationId);
                const { openlink } = await (0, wechatMpJump_1.wechatMpJump)({ applicationId, jump_wxa: jump_wxa, expiresAt: expiresAt, expireType: expireType, expireInterval: expireInterval }, context);
                Object.assign(wechatMpJumpData, {
                    openlink
                });
            };
            if (data instanceof Array) {
                for (const ele of data) {
                    await fn(ele);
                }
            }
            else {
                await fn(data);
            }
            return 0;
        },
    },
];
exports.default = triggers;
