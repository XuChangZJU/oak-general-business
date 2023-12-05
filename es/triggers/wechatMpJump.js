import { assert } from 'oak-domain/lib/utils/assert';
import { wechatMpJump } from '../aspects/wechatMpJump';
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
                assert(applicationId);
                const openlink = await wechatMpJump({ applicationId, jump_wxa: jump_wxa, expiresAt: expiresAt, expireType: expireType, expireInterval: expireInterval }, context);
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
export default triggers;
