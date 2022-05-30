import { EntityDict } from 'oak-app-domain/EntityDict';
import { CreateTriggerInTxn, Trigger } from 'oak-domain/lib/types/Trigger';
import { GeneralRuntimeContext } from '../RuntimeContext';
import { CreateOperationData as CreateUserEntityGrantData } from 'oak-app-domain/UserEntityGrant/Schema';

import { assign, keys } from 'lodash';
import { OakCongruentRowExists } from 'oak-domain/lib/types';
import assert from 'assert';

const triggers: Trigger<EntityDict, 'userEntityGrant', GeneralRuntimeContext<EntityDict>>[] = [
    {
        name: '当创建userEntityGrant时,查询是否有未过期的实体',
        entity: 'userEntityGrant',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (userEntityGrantData: CreateUserEntityGrantData) => {
                const { userId } = (await context.getToken())!;
                assert(userId);
                const { action, entity, entityId, relation} = userEntityGrantData;
                const { result } = await context.rowStore.select('userEntityGrant', {
                    data: {
                        id: 1,
                        action: 1,
                        entity: 1,
                        entityId: 1,
                        relation: 1,
                        iState: 1,
                        granterId: 1,
                    },
                    filter: {
                        iState: 'init',
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

                assign(userEntityGrantData, {
                    granterId: userId,
                });
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