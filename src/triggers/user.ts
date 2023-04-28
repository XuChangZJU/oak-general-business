import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { CreateTrigger, Trigger } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../general-app-domain/EntityDict';
import { CreateOperationData as CreateUserData } from '../general-app-domain/User/Schema';
import { ROOT_USER_ID } from '../constants';
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
                const result = await Promise.all(
                    [
                        context.select('user', {
                            data: {
                                id: 1,
                            },
                            filter: {
                                id: {
                                    $in: {
                                        entity: 'userRelation',
                                        data: {
                                            userId: 1,
                                        },
                                        filter: {
                                            relation: {
                                                entity: 'role',
                                                name: 'owner',
                                            }
                                        }
                                    }
                                }
                            },
                            indexFrom: 0,
                            count: 1,
                        }, {
                            dontCollect: true,
                        }),
                        context.select('relation', {
                            data: {
                                id: 1,
                            },
                            filter: {
                                name: 'owner',
                                entity: 'role',                       
                            }
                        }, {
                            dontCollect: true,
                        })
                    ]
                );
                if (result[0].length === 0) {
                    assert(result[1].length > 0);
                    const { id } = result[1][0];
                    await context.operate('userRelation', {
                        id: generateNewId(),
                        action: 'create',
                        data: {
                            id: generateNewId(),
                            userId: data.id,
                            relationId: id!,
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
];

export default triggers;
