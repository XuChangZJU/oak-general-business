import { CreateTriggerInTxn, Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from 'oak-app-domain/EntityDict';
import { GeneralRuntimeContext } from '../RuntimeContext';
import { CreateOperationData as CreateUserRoleData } from 'oak-app-domain/UserRole/Schema';
import { CreateOperationData as CreateUserData } from 'oak-app-domain/User/Schema';
import assert from 'assert';
import { ROOT_ROLE_ID, ROOT_USER_ID } from '../constants';

let NO_ANY_USER = true;
const triggers: Trigger<EntityDict, 'user', GeneralRuntimeContext<EntityDict>>[] = [
    {
        name: '系统生成的第一个用户默认注册为root，用户的初始状态默认为shadow',
        entity: 'user',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data } = operation;
            const setDefaultState = (userData: CreateUserData) => {
                if (!userData.userState) {
                    userData.userState = 'shadow';
                }
            };
            if (data instanceof Array) {
                data.forEach(
                    ele => setDefaultState(ele)
                );
            }
            else {
                setDefaultState(data);
            }
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
                }, context, params);
                if (result.length === 0) {
                    const userData = data instanceof Array ? data[0] : data;
                    const userRoleData: CreateUserRoleData = {
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
    },
];

export default triggers;
