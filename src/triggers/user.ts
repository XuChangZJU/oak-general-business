import { generateNewId, generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { CreateTrigger, Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { CreateOperationData as CreateUserRoleData } from '../general-app-domain/UserRole/Schema';
import { CreateOperationData as CreateUserData } from '../general-app-domain/User/Schema';
import { ROOT_ROLE_ID, ROOT_USER_ID } from '../constants';
import { randomName } from '../utils/randomUser';
import { RuntimeCxt } from '../types/RuntimeCxt';
import assert from 'assert';

let NO_ANY_USER = true;
const triggers: Trigger<EntityDict, 'user', RuntimeCxt>[] = [
    {
        name: '用户的初始状态默认为shadow',
        entity: 'user',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context) => {
            const { data } = operation;
            const systemId = context.getSystemId();
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
            return 1;
        }
    } as CreateTrigger<EntityDict, 'user', RuntimeCxt>,
    {
        name: '系统生成的第一个用户默认注册为root，用户的初始状态默认为shadow',
        entity: 'user',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context) => {
            const { data } = operation;
            assert(!(data instanceof Array));
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
                    await context.operate('userRole', {
                        id: generateNewId(),
                        action: 'create',
                        data: {
                            id: generateNewId(),
                            userId: data.id,
                            roleId: ROOT_ROLE_ID,
                            relation: 'owner',
                        },
                    }, {
                        blockTrigger: true,
                        dontCollect: true,
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
        name: '当用户被激活时，将所有的parasite作废',
        entity: 'user',
        action: 'activate',
        when: 'before',
        fn: async({ operation }) => {
            const { data } = operation as EntityDict['user']['Update'];
            assert(!(data instanceof Array));
            data.parasite$user = {
                id: await generateNewIdAsync(),
                action: 'update',
                data: {
                    expired: true,
                    token$entity: {
                        id: await generateNewIdAsync(),
                        action: 'disable',
                        data: {},
                    }
                }
            };

            return 1;
        }
    }
];

export default triggers;
