import { Trigger, CreateTrigger, UpdateTrigger } from 'oak-domain/lib/types/Trigger';
import { RuntimeContext } from '../context/RuntimeContext';
import { CreateOperationData as CreateUserEntityGrantData } from '../general-app-domain/UserEntityGrant/Schema';
import { EntityDict } from '../general-app-domain/EntityDict';

import {
    OakCongruentRowExists,
    OakException,
    OakRowInconsistencyException,
    OakExternalException
} from 'oak-domain/lib/types';
import { assert } from 'oak-domain/lib/utils/assert';
import { DefaultConfig } from '../constants';
import { createWechatQrCode } from '../aspects/wechatQrCode';
import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';

const triggers: Trigger<EntityDict, 'userEntityGrant', RuntimeContext<EntityDict>>[] = [
    {
        name: '当创建userEntityGrant时，查询是否有未过期可重用的对象',
        entity: 'userEntityGrant',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (userEntityGrantData: CreateUserEntityGrantData) => {
                const { userId } = (await context.getToken())!;
                assert(userId);
                const { id } = userEntityGrantData;

                Object.assign(userEntityGrantData, {
                    granterId: userId,
                    expired: false,
                });
                // 为之创建微信体系下的一个weChatQrCode
                await createWechatQrCode(
                    {
                        entity: 'userEntityGrant',
                        entityId: id,
                        props: {
                            pathname: '/userEntityGrant/confirm',
                            props: {
                                oakId: id,
                            },
                        },
                    },
                    context
                );
                
            }
            if (data instanceof Array) {
                assert('授权不存在一对多的情况')
            }
            else {
                await fn(data);
            }
            return 0;
        }
    } as CreateTrigger<EntityDict, 'userEntityGrant', RuntimeContext<EntityDict>>,
        {
        name: '当userEntityGrant准备确认时，附上被授权者id',
        entity: 'userEntityGrant',
        action: 'confirm',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const { userId } = (await context.getToken())!;
            const { result } = await context.rowStore.select(
                'userEntityGrant',
                {
                    data: {
                        id: 1,
                        entity: 1,
                        entityId: 1,
                        relation: 1,
                        number: 1,
                        confirmed: 1,
                    },
                    filter: {
                        id: filter!.id,
                    },
                    indexFrom: 0,
                    count: 1,
                },
                context,
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
            return 0
        }
    } as UpdateTrigger<EntityDict, 'userEntityGrant', RuntimeContext<EntityDict>>,
    {
        name: '当userEntityGrant被确认时，生成user和entity关系',
        entity: 'userEntityGrant',
        action: 'confirm',
        when: 'after',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const { userId } = (await context.getToken())!;
            const {
                result: [userEntityGrant],
            } = await context.rowStore.select(
                'userEntityGrant',
                {
                    data: {
                        id: 1,
                        entity: 1,
                        entityId: 1,
                        relation: 1,
                        granterId: 1,
                        type: 1,
                    },
                    filter: {
                        id: filter!.id,
                    },
                    indexFrom: 0,
                    count: 1,
                },
                context,
                {
                    dontCollect: true,
                }
            );
            const { entity, entityId, relation, granterId, type } = userEntityGrant;
            const entityStr = firstLetterUpperCase(entity!);
            const userRelation = `user${entityStr}` as keyof EntityDict;
            const { result: result2 } = await context.rowStore.select(
                userRelation,
                {
                    data: {
                        id: 1,
                        userId: 1,
                        relation: 1,
                        [`${entity}Id`]: 1,
                    },
                    filter: {
                        userId: userId!,
                        relation,
                        [`${entity}Id`]: entityId,
                    },
                    indexFrom: 0,
                    count: 1,
                },
                context,                
                {
                    dontCollect: true,
                }
            );
            if (result2.length) {
                throw new OakRowInconsistencyException(
                    {
                        a: 'c',
                        e: userRelation,
                        d: result2 as any,
                    },
                    '已领取该权限'
                );
            } else {
                await context.rowStore.operate(
                    userRelation,
                    {
                        id: await generateNewId(),
                        action: 'create',
                        data: {
                            id: await generateNewId(),
                            userId,
                            [`${entity}Id`]: entityId,
                            relation,
                        } as any,
                    },
                    context,
                    params
                );
                // todo type是转让的话 需要回收授权者的关系
                if (type === 'transfer') {
                    const { result: result3 } = await context.rowStore.select(
                        userRelation,
                        {
                            data: {
                                id: 1,
                                userId: 1,
                                relation: 1,
                                [`${entity}Id`]: 1,
                            },
                            filter: {
                                userId: granterId!,
                                relation,
                                [`${entity}Id`]: entityId,
                            },
                            indexFrom: 0,
                            count: 1,
                        },
                        context,
                        {
                            dontCollect: true,
                        }
                    );
                    assert(result3[0]);
                    await context.rowStore.operate(
                        userRelation,
                        {
                            id: await generateNewId(),
                            action: 'remove',
                            data: {},
                            filter: {
                                id: result3[0].id,
                            },
                        },
                        context,
                        params
                    );
                }
             
                return 1;
            }
        }
    } as UpdateTrigger<EntityDict, 'userEntityGrant', RuntimeContext<EntityDict>>
];
export default triggers;