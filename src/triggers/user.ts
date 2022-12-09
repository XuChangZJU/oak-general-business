import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { CreateTrigger, CreateTriggerInTxn, SelectTriggerBefore, Trigger, UpdateTrigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { RuntimeContext } from '../context/RuntimeContext';
import { CreateOperationData as CreateUserRoleData } from '../general-app-domain/UserRole/Schema';
import { CreateOperationData as CreateUserData } from '../general-app-domain/User/Schema';
import { assert } from 'oak-domain/lib/utils/assert';
import { ROOT_ROLE_ID, ROOT_USER_ID } from '../constants';
import { addFilterSegment } from 'oak-domain/lib/store/filter';
import { randomName } from '../utils/randomUser';
import { RuntimeCxt } from '../types/RuntimeCxt';

let NO_ANY_USER = true;
const triggers: Trigger<EntityDict, 'user', RuntimeCxt>[] = [
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
                    userData.nickname = randomName('user_', 8);
                }
            };
            if (data instanceof Array) {
                await Promise.all(
                    data.map(
                        async ele => {
                            Object.assign(ele, {
                                userSystem$user: [{
                                    id: generateNewId(),
                                    action: 'create',
                                    data: {
                                        id: generateNewId(),
                                        systemId,
                                    }
                                }],
                            })
                            setDefaultState(ele);
                        }
                    ));
            }
            else {
                Object.assign(data, {
                    userSystem$user: [{
                        id: generateNewId(),
                        action: 'create',
                        data: {
                            id: generateNewId(),
                            systemId,
                        }
                    }],
                })
                setDefaultState(data);
            }
            if (NO_ANY_USER) {
                const result = await context.select('user', {
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
                }, {
                    dontCollect: true,
                });
                if (result.length === 0) {
                    const userData = data instanceof Array ? data[0] : data;
                    const userRoleData: CreateUserRoleData = {
                        id: generateNewId(),
                        userId: userData.id,
                        roleId: ROOT_ROLE_ID,
                        relation: 'owner',
                    };
                    Object.assign(userData, {
                        userRole$user: [
                            {
                                id: generateNewId(),
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
    } as CreateTrigger<EntityDict, 'user', RuntimeCxt>,
    {
        name: '当扮演某个用户时，切换当前用户的token中的userId',
        entity: 'user',
        action: 'play',
        when: 'after',
        fn: async ({ operation }, context) => {
            const { filter } = operation;
            assert(filter!.id);
            const { id } = context.getToken()!;
            await context.operate('token', {
                id: generateNewId(),
                action: 'update',
                data: {
                    userId: filter!.id as string,
                },
                filter: {
                    id,
                }
            }, {
                dontCollect: true,
            });
            return 1;
        }
    } as UpdateTrigger<EntityDict, 'user', RuntimeCxt>,
];

export default triggers;
