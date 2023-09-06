import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { assert } from 'oak-domain/lib/utils/assert';
const triggers = [
    {
        name: '当创建wechatLogin时，尝试为之创建一个wechatQrCode',
        entity: 'wechatLogin',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (wechatLoginData) => {
                const { id } = wechatLoginData;
                Object.assign(wechatLoginData, {
                    expired: false,
                    successed: false,
                });
                if (!wechatLoginData.expiresAt) {
                    Object.assign(wechatLoginData, {
                        expiresAt: Date.now() + 2 * 60 * 1000,
                    });
                }
                // 为之创建微信体系下的一个weChatQrCode
                await context.operate('wechatQrCode', {
                    id: await generateNewIdAsync(),
                    action: 'create',
                    data: {
                        id: await generateNewIdAsync(),
                        entity: 'wechatLogin',
                        entityId: id,
                        props: {
                            pathname: '/wechatLogin/confirm',
                            props: {
                                oakId: id,
                            },
                        },
                        type: wechatLoginData.qrCodeType,
                    },
                }, {});
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
        name: '当wechatLogin过期时，使其相关的wechatQrCode也过期',
        entity: 'wechatLogin',
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
                    wechatLogin: filter,
                },
            }, {});
            return 1;
        },
    },
];
export default triggers;
