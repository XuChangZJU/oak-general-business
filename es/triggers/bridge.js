import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { assert } from 'oak-domain/lib/utils/assert';
const triggers = [
    {
        name: '当创建bridge时，尝试为之创建一个wechatQrCode',
        entity: 'bridge',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (BridgeData) => {
                const { userId } = context.getToken();
                assert(userId);
                const { id } = BridgeData;
                Object.assign(BridgeData, {
                    expired: false,
                });
                if (!BridgeData.expiresAt) {
                    Object.assign(BridgeData, {
                        expiresAt: Date.now() + 300 * 1000,
                    });
                }
                BridgeData.wechatQrCode$entity = [
                    {
                        id: await generateNewIdAsync(),
                        action: 'create',
                        data: {
                            id: await generateNewIdAsync(),
                            props: BridgeData?.redirectTo,
                            type: BridgeData.qrCodeType,
                        },
                    }
                ];
            };
            if (data instanceof Array) {
                assert('授权不存在一对多的情况');
            }
            else {
                await fn(data);
            }
            return 0;
        },
    },
    {
        name: '当bridge过期时，使其相关的wechatQrCode也过期',
        entity: 'bridge',
        action: 'update',
        check: (operation) => {
            const { data } = operation;
            return !!data.expired;
        },
        when: 'before',
        fn: async ({ operation }, context) => {
            const { data, filter } = operation;
            await context.operate('wechatQrCode', {
                id: await generateNewIdAsync(),
                action: 'update',
                data: {
                    expired: true,
                },
                filter: {
                    bridge: filter,
                },
            }, {});
            return 1;
        },
    },
];
export default triggers;
