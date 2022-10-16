import { CreateTrigger, CreateTriggerInTxn, SelectTriggerBefore, Trigger, UpdateTrigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { RuntimeContext } from '../context/RuntimeContext';
import { CreateOperationData as CreateUserRoleData } from '../general-app-domain/UserRole/Schema';
import { CreateOperationData as CreateUserData } from '../general-app-domain/User/Schema';
import { assert } from 'oak-domain/lib/utils/assert';
import { ROOT_ROLE_ID, ROOT_USER_ID } from '../constants';
import { addFilterSegment } from 'oak-domain/lib/store/filter';
import { randomName } from '../utils/randomUser';

let NO_ANY_USER = true;
const triggers: Trigger<EntityDict, 'user', RuntimeContext<EntityDict>>[] = [
    {
        name: '系统生成的第一个用户默认注册为root，用户的初始状态默认为shadow',
        entity: 'user',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context) => {
            const { data } = operation;
            const systemId = await context.getSystemId();
            const setDefaultState = (userData: CreateUserData) => {
                if (!userData.userState) {
                    userData.userState = 'shadow';
                }
                if (!userData.nickname) {
                    userData.nickname = randomName('用户', 8);
                }
            };
            if (data instanceof Array) {
                data.forEach(
                    ele => {
                        Object.assign(ele, {
                            systemId,
                        })
                        setDefaultState(ele)
                    }
                );
            }
            else {
                Object.assign(data, {
                    systemId,
                })
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
                        systemId: systemId,
                    },
                    indexFrom: 0,
                    count: 1,
                }, context, {
                    dontCollect: true,
                });
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
                                id: await generateNewId(),
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
    } as CreateTrigger<EntityDict, 'user', RuntimeContext<EntityDict>>,
    {
        name: '当扮演某个用户时，切换当前用户的token中的userId',
        entity: 'user',
        action: 'play',
        when: 'after',
        fn: async ({ operation }, context) => {
            const { filter } = operation;
            assert (filter!.id);
            const { id } = (await context.getToken())!;
            await context.rowStore.operate('token', {
                id: await generateNewId(),
                action: 'update',
                data: {
                    userId: filter!.id as string,
                },
                filter: {
                    id,
                }
            }, context, {
                dontCollect: true,
            });
            return 1;
        }
    } as UpdateTrigger<EntityDict, 'user', RuntimeContext<EntityDict>>,
    {
        name: '查询用户时，默认加上systemId',
        entity: 'user',
        action: 'select',
        when: 'before',
        fn: async ({ operation}, context) => {
            const app = await context.getApplication();
            if (app) {
                const { filter } = operation;
                if (!filter) {
                    Object.assign(operation, {
                        filter: {
                            systemId: app.systemId,
                        },
                    });
                }
                else {
                    Object.assign(operation, {
                        filter: addFilterSegment({
                            systemId: app.systemId,
                        }, filter),
                    });
                }
                return 1;
            }
            return 0;
        }
    } as SelectTriggerBefore<EntityDict, 'user', RuntimeContext<EntityDict>>
];

export default triggers;
