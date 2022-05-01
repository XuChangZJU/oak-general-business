import { CreateTriggerInTxn, Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from 'oak-app-domain/EntityDict';
import { GeneralRuntimeContext } from '../RuntimeContext';
import { CreateOperationData as UserRole } from 'oak-app-domain/UserRole/Schema';
import assert from 'assert';
import { ROOT_ROLE_ID, ROOT_USER_ID } from '../constants';
import { DeduceCreateOperationData } from 'oak-domain/lib/types';

let NO_ANY_USER = true;
const triggers: Trigger<EntityDict, 'user', GeneralRuntimeContext<EntityDict>>[] = [
    {
        name: '系统生成的第一个用户默认注册为root',
        entity: 'user',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context) => {
            if (NO_ANY_USER) {
                const { rowStore } = context;
                const { result } = await rowStore.select('user', {
                    data: {
                        id: 1,
                    },
                    filter: {
                        id: {
                            $ne: ROOT_USER_ID,
                        },
                    },
                    indexFrom: 0,
                    count: 1,
                }, context);
                if (result.length === 0) {
                    const { data } = operation;
                    const userData = data instanceof Array ? data[0] : data;
                    const userRoleData: UserRole = {
                        id: await generateNewId(),
                        userId: userData.id,
                        roleId: ROOT_ROLE_ID,
                        relation: 'owner',
                    };
                    Object.assign(userData, {
                        userRole$user: [
                            {
                                action: 'create',
                                data: userRoleData,
                            }
                        ]
                    });
                    return 1;
                }
                else {
                    NO_ANY_USER = false;
                }
            }
            return 0;
        }
    }
];

export default triggers;
