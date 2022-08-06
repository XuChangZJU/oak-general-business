import { EntityDict } from 'general-app-domain/EntityDict';
import { CreateTriggerInTxn, Trigger } from 'oak-domain/lib/types/Trigger';
import { GeneralRuntimeContext } from '../RuntimeContext';
import { CreateOperationData as CreateUserEntityGrantData } from 'general-app-domain/UserEntityGrant/Schema';

import { OakCongruentRowExists, OakException } from 'oak-domain/lib/types';
import { assert } from 'oak-domain/lib/utils/assert';
import { DefaultConfig } from '../constants';
import { createWechatQrCode } from '../aspects/wechatQrCode';
import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';

const triggers: Trigger<EntityDict, 'userEntityGrant', GeneralRuntimeContext<EntityDict>>[] = [
    {
        name: '当创建userEntityGrant时，查询是否有未过期可重用的对象',
        entity: 'userEntityGrant',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (userEntityGrantData: CreateUserEntityGrantData) => {
                const { userId } = (await context.getToken())!;
                const { id: applicationId, config: appConfig, system: { config: SystemConfig }, systemId } = (await context.getApplication())!;
                assert(userId);
                const { type, entity, entityId, relation, id } = userEntityGrantData;
                const { result } = await context.rowStore.select('userEntityGrant', {
                    data: {
                        id: 1,
                        type: 1,
                        entity: 1,
                        entityId: 1,
                        relation: 1,
                        expired: 1,
                        granterId: 1,
                    },
                    filter: {
                        expired: false,
                        expiresAt: {
                            $gt: Date.now() - 600 * 1000,
                        },      // 至少有10分钟有效期的
                        type,
                        entity,
                        entityId,
                        granterId: userId,
                        relation,
                    },
                    indexFrom: 0,
                    count: 1,
                }, context, params);
                if (result.length) {
                    throw new OakCongruentRowExists(result[0] as any, '有可重用的userEntityGrant');
                }

                const expiresAt = Date.now() + (SystemConfig.UserEntityGrant?.lifetimeLength || DefaultConfig.userEntityGrant.lifetimeLength);

                Object.assign(userEntityGrantData, {
                    granterId: userId,
                    expiresAt,
                    expired: false,
                });
                // 如果是微信体系的应用，为之创建一个默认的weChatQrCode
                // 如果网站支持公众号码生成
                if (['wechatPublic', 'wechatMp', 'web'].includes(appConfig!.type)) {
                    await createWechatQrCode(
                        {
                            entity: 'userEntityGrant',
                            entityId: id,
                            applicationId,
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
                
            }
            if (data instanceof Array) {
                assert('授权不存在一对多的情况')
            }
            else {
                await fn(data);
            }
            return 0;
        }
    },
    {
        name: '当创建userEntityGrant确认时，附上被授权者id',
        entity: 'userEntityGrant',
        action: 'confirm',
        when: 'after',
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
                    },
                    filter: {
                        id: filter!.id,
                    },
                    indexFrom: 0,
                    count: 1,
                },
                context,
                params
            );
            const { entity, entityId, relation, type } = result[0];
            const entityStr = firstLetterUpperCase(entity!);
            const userRelation = `user${entityStr}` as keyof EntityDict;
            //如果是relation是transfer，需要处理授权者名下entity关系转让给接收者
            const { result: result2 } = await context.rowStore.select(
                userRelation,
                {
                    data: {
                        id: 1,
                    },
                    filter: {
                        userId,
                        relation,
                        [`${entity}Id`]: entityId,
                    },
                    indexFrom: 0,
                    count: 1,
                },
                context,
                params
            );
            if (result2.length) {
                throw new OakCongruentRowExists(
                    result2[0] as any,
                    '已领用该权限'
                );
            } else {
                await context.rowStore.operate(
                    userRelation,
                    {
                        action: 'create',
                        data: {
                            userId,
                            [`${entity}Id`]: entityId,
                            relation,
                        } as any,
                    },
                    context
                );
                return 1;
            }
        }
    }
];
export default triggers;