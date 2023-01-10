import { generateNewId, generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
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
import { OakRowInconsistencyException } from 'oak-domain/lib/types';

let NO_ANY_USER = true;
const triggers: Trigger<EntityDict, 'user', RuntimeCxt>[] = [
    {
        name: '用户的初始状态默认为shadow，设置与本system的连接',
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
                                    id: await generateNewIdAsync(),
                                    action: 'create',
                                    data: {
                                        id: await generateNewIdAsync(),
                                        systemId,
                                    }
                                }],
                            })
                            setDefaultState(ele);
                        }
                    )
                );
                return data.length;
            }
            else {
                Object.assign(data, {
                    userSystem$user: [{
                        id: await generateNewIdAsync(),
                        action: 'create',
                        data: {
                            id: await generateNewIdAsync(),
                            systemId,
                        }
                    }],
                })
                setDefaultState(data);
                return 1;
            }
        }
    } as CreateTrigger<EntityDict, 'user', RuntimeCxt>,
    {
        name: '系统生成的第一个用户默认注册为root',
        entity: 'user',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context) => {
            const { data } = operation;            
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
                    const { id } = userData;

                    // 这里必须要blockTrigger，不然relationHierarchy的默认检查会永远过不去
                    await context.operate('userRole', {
                        id: await generateNewIdAsync(),
                        action: 'create',
                        data: {
                            id: await generateNewIdAsync(),
                            userId: id,
                            roleId: ROOT_ROLE_ID,
                            relation: 'owner',
                        }
                    }, {
                        blockTrigger: true,
                    });
                    return 1;
                }
                else {
                    NO_ANY_USER = false;
                }
            }
            return 0;
        }
    } as CreateTrigger<EntityDict, 'user', RuntimeCxt>
];

export default triggers;
