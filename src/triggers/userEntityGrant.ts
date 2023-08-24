import { generateNewId, generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { Trigger, CreateTrigger, UpdateTrigger, SelectTrigger } from 'oak-domain/lib/types/Trigger';
import { CreateOperationData as CreateUserEntityGrantData } from '../oak-app-domain/UserEntityGrant/Schema';
import { EntityDict } from '../oak-app-domain/EntityDict';

import { OakRowInconsistencyException, OakExternalException, SelectOpResult } from 'oak-domain/lib/types';
import { assert } from 'oak-domain/lib/utils/assert';
import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { BRC } from '../types/RuntimeCxt';

const triggers: Trigger<EntityDict, 'userEntityGrant', BRC>[] = [
    {
        name: '当创建userEntityGrant时，尝试为之创建一个wechatQrCode',
        entity: 'userEntityGrant',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (
                userEntityGrantData: CreateUserEntityGrantData
            ) => {
                const { userId } = context.getToken()!;
                assert(userId);
                const { id } = userEntityGrantData;

                Object.assign(userEntityGrantData, {
                    granterId: userId,
                    expired: false,
                });
                if (!userEntityGrantData.expiresAt) {
                    Object.assign(userEntityGrantData, {
                        expiresAt: Date.now() + 300 * 1000,
                    });
                }
                userEntityGrantData.wechatQrCode$entity = [
                    {
                        id: await generateNewIdAsync(),
                        action: 'create',
                        data: {
                            id: await generateNewIdAsync(),
                            props: {
                                pathname: '/userEntityGrant/confirm',
                                props: {
                                    oakId: id,
                                },
                            },
                            type: userEntityGrantData.qrCodeType,
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
    } as CreateTrigger<EntityDict, 'userEntityGrant', BRC>,
    {
        name: '当userEntityGrant准备确认时，附上被授权者id',
        entity: 'userEntityGrant',
        action: 'confirm',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const { userId } = (await context.getToken())!;
            const result = await context.select(
                'userEntityGrant',
                {
                    data: {
                        id: 1,
                        entity: 1,
                        entityId: 1,
                        relationId: 1,
                        number: 1,
                        confirmed: 1,
                    },
                    filter: {
                        id: filter!.id,
                    },
                    indexFrom: 0,
                    count: 1,
                },
                {
                    dontCollect: true,
                }
            );
            const { number, confirmed } = result[0];
            if (confirmed! >= number!) {
                throw new OakExternalException(`超出分享上限人数${number}人`);
            }
            Object.assign(data, {
                confirmed: confirmed! + 1,
            });
            if (number === 1) {
                // 单次分享 附上接收者id
                Object.assign(data, {
                    granteeId: userId,
                });
            }
            return 0;
        },
    } as UpdateTrigger<EntityDict, 'userEntityGrant', BRC>,
    {
        name: '当userEntityGrant被确认时，生成user和entity关系',
        entity: 'userEntityGrant',
        action: 'confirm',
        when: 'after',
        fn: async ({ operation }, context, option) => {
            const { data, filter } = operation;
            const { userId } = context.getToken()!;
            const [userEntityGrant] = await context.select(
                'userEntityGrant',
                {
                    data: {
                        id: 1,
                        entity: 1,
                        entityId: 1,
                        relationId: 1,
                        granterId: 1,
                        type: 1,
                    },
                    filter: {
                        id: filter!.id,
                    },
                    indexFrom: 0,
                    count: 1,
                },
                {
                    dontCollect: true,
                }
            );
            const { entity, entityId, relationId, granterId, type } =
                userEntityGrant;

            const closeRootMode = context.openRootMode();
            const result2 = await context.select(
                'userRelation',
                {
                    data: {
                        id: 1,
                        userId: 1,
                        relationId: 1,
                    },
                    filter: {
                        userId: userId!,
                        relationId,
                        entity,
                        entityId,
                    },
                    indexFrom: 0,
                    count: 1,
                },
                {
                    dontCollect: true,
                }
            );
            if (result2.length) {
                const e = new OakRowInconsistencyException<EntityDict>(undefined, '已领取该权限');
                e.addData('userRelation', result2);
                closeRootMode();
                throw e;
            } else {
                try {
                    await context.operate(
                        'userRelation',
                        {
                            id: generateNewId(),
                            action: 'create',
                            data: {
                                id: generateNewId(),
                                userId,
                                relationId,
                                entity,
                                entityId,
                            },
                        },
                        option
                    );
                    // todo type是转让的话 需要回收授权者的关系
                    if (type === 'transfer') {
                        await context.operate(
                            'userRelation',
                            {
                                id: await generateNewIdAsync(),
                                action: 'remove',
                                data: {},
                                filter: {
                                    relationId,
                                    userId: granterId,
                                    entity,
                                    entityId,
                                },
                            },
                            option
                        );
                    }
                } catch (err) {
                    closeRootMode();
                    throw err;
                }

                closeRootMode();
                return 1;
            }
        },
    } as UpdateTrigger<EntityDict, 'userEntityGrant', BRC>,
    {
        name: '当userEntityGrant过期时，使其相关的wechatQrCode也过期',
        entity: 'userEntityGrant',
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
                        userEntityGrant: filter,
                    },
                },
                {}
            );
        
            return 1;
        },
    } as UpdateTrigger<EntityDict, 'userEntityGrant', BRC>,
];
export default triggers;