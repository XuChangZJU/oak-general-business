"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("oak-domain/lib/utils/uuid");
const assert_1 = require("oak-domain/lib/utils/assert");
const triggers = [
    {
        name: '当创建userEntityGrant时，尝试为之创建一个wechatQrCode',
        entity: 'userEntityGrant',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (userEntityGrantData) => {
                const { userId } = context.getToken();
                (0, assert_1.assert)(userId);
                const { id, claimUrl } = userEntityGrantData;
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
                        id: await (0, uuid_1.generateNewIdAsync)(),
                        action: 'create',
                        data: {
                            id: await (0, uuid_1.generateNewIdAsync)(),
                            props: {
                                pathname: claimUrl || '/userEntityGrant/claim',
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
                (0, assert_1.assert)('授权不存在一对多的情况');
            }
            else {
                await fn(data);
            }
            return 0;
        },
    },
    /* {
        name: '当userEntityGrant准备确认时，附上被授权者id',
        entity: 'userEntityGrant',
        action: 'confirm',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const { userId } = context.getToken()!;
            const closeRootMode = context.openRootMode();
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
                throw new OakUserException(`超出分享上限人数${number}人`);
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
            closeRootMode();
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
            const closeRootMode = context.openRootMode();
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
                            id: await generateNewIdAsync(),
                            action: 'create',
                            data: {
                                id: await generateNewIdAsync(),
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
    } as UpdateTrigger<EntityDict, 'userEntityGrant', BRC>, */
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
            await context.operate('wechatQrCode', {
                id: await (0, uuid_1.generateNewIdAsync)(),
                action: 'update',
                data: {
                    expired: true,
                },
                filter: {
                    userEntityGrant: filter,
                },
            }, {});
            return 1;
        },
    },
];
exports.default = triggers;
