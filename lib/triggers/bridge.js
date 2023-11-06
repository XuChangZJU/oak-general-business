"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("oak-domain/lib/utils/uuid");
const assert_1 = require("oak-domain/lib/utils/assert");
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
                (0, assert_1.assert)(userId);
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
                        id: await (0, uuid_1.generateNewIdAsync)(),
                        action: 'create',
                        data: {
                            id: await (0, uuid_1.generateNewIdAsync)(),
                            props: BridgeData?.redirectTo,
                            type: BridgeData.qrCodeType,
                        },
                    }
                ];
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
                id: await (0, uuid_1.generateNewIdAsync)(),
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
exports.default = triggers;
