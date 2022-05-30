import { EntityDict } from 'oak-app-domain/EntityDict';
import { CreateTriggerInTxn, Trigger } from 'oak-domain/lib/types/Trigger';
import { GeneralRuntimeContext } from '../RuntimeContext';
import { CreateOperationData as CreateUserEntityGrantData } from 'oak-app-domain/UserEntityGrant/Schema';

import { assign, keys } from 'lodash';
import { OakCongruentRowExists } from 'oak-domain/lib/types';
import assert from 'assert';
import { DefaultConfig } from '../constants';
import { createWechatQrCode } from '../aspects/wechatQrCode';

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
                const { id: applicationId, config: appConfig, system: { config: SystemConfig }} = (await context.getApplication());
                assert(userId);
                const { action, entity, entityId, relation, id } = userEntityGrantData;
                const { result } = await context.rowStore.select('userEntityGrant', {
                    data: {
                        id: 1,
                        action: 1,
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
                        action,
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

                assign(userEntityGrantData, {
                    granterId: userId,
                    expiresAt,
                    expired: false,
                });
                // 如果是微信体系的应用，为之创建一个默认的weChatQrCode
                if (['wechatPublic', 'wechatMp'].includes(appConfig.type)) {
                    await createWechatQrCode({
                        entity: 'userEntityGrant',
                        entityId: id,
                        applicationId,
                        props: {
                            pathname: 'pages/userEntityGrant/confirm',
                            props: {
                                oakId: id,
                            },
                        }
                    }, context);
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
];
export default triggers;