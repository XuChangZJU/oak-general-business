import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { Trigger, CreateTrigger, UpdateTrigger } from 'oak-domain/lib/types/Trigger';
import { CreateOperationData as CreateBridgeData } from '../oak-app-domain/Bridge/Schema';
import { EntityDict } from '../oak-app-domain/EntityDict';

import { OakRowInconsistencyException, OakUserException } from 'oak-domain/lib/types';
import { assert } from 'oak-domain/lib/utils/assert';
import { BRC } from '../types/RuntimeCxt';

const triggers: Trigger<EntityDict, 'bridge', BRC>[] = [
    {
        name: '当创建bridge时，尝试为之创建一个wechatQrCode',
        entity: 'bridge',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (
                BridgeData: CreateBridgeData
            ) => {
                const { userId } = context.getToken()!;
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
            } else {
                await fn(data);
            }
            return 0;
        },
    } as CreateTrigger<EntityDict, 'bridge', BRC>,
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
            await context.operate(
                'wechatQrCode',
                {
                    id: await generateNewIdAsync(),
                    action: 'update',
                    data: {
                        expired: true,
                    },
                    filter: {
                        bridge: filter,
                    },
                },
                {}
            );

            return 1;
        },
    } as UpdateTrigger<EntityDict, 'bridge', BRC>,
];
export default triggers;