import { EntityDict } from 'oak-app-domain/EntityDict';
import { CreateTriggerInTxn, Trigger } from 'oak-domain/lib/types/Trigger';
import { GeneralRuntimeContext } from '../RuntimeContext';

import { assign } from "lodash";
import { OakRowInconsistencyException } from 'oak-domain/lib/types';
const triggers: Trigger<EntityDict, 'userEntityGrant', GeneralRuntimeContext<EntityDict>>[] = [
    {
        name: '当创建userEntityGrant时,查询是否有未过期的实体',
        entity: 'userEntityGrant',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const { result } = await context.rowStore.select('userEntityGrant', {
                    data: Object.assign({
                        iState: 1
                    }, data),
                filter: {
                    iState: 'init',
                    },
                    indexFrom: 0,
                    count: 1,
            }, context, params);
        }
    },
];
export default triggers;