import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { ROOT_USER_ID } from '../constants';
import { randomName } from '../utils/randomUser';
import { assert } from 'oak-domain/lib/utils/assert';
let NO_ANY_USER = true;
const triggers = [
    {
        name: '用户的初始状态默认为shadow',
        entity: 'user',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context) => {
            const { data } = operation;
            const systemId = context.getSystemId();
            const setData = async (userData) => {
                if (!userData.userState) {
                    userData.userState = 'shadow';
                }
                if (!userData.nickname) {
                    userData.nickname = randomName('user_', 8);
                }
                userData.userSystem$user = [
                    {
                        id: await generateNewIdAsync(),
                        action: 'create',
                        data: {
                            id: await generateNewIdAsync(),
                            systemId,
                        },
                    },
                ];
            };
            if (data instanceof Array) {
                for (const item of data) {
                    await setData(item);
                }
            }
            else {
                await setData(data);
            }
            return 1;
        },
    },
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
                        isRoot: true,
                        id: {
                            $ne: ROOT_USER_ID,
                        }
                    },
                    indexFrom: 0,
                    count: 1,
                }, {
                    dontCollect: true,
                });
                if (result.length === 0) {
                    Object.assign(data, {
                        isRoot: true,
                    });
                }
                else {
                    NO_ANY_USER = false;
                }
            }
            return 0;
        },
    },
    {
        name: '当用户被激活时，将所有的parasite作废',
        entity: 'user',
        action: 'activate',
        when: 'after',
        fn: async ({ operation }, context) => {
            const { data, filter } = operation;
            assert(!(data instanceof Array));
            const parasiteList = await context.select('parasite', {
                data: {
                    id: 1,
                },
                filter: {
                    user: filter,
                    expired: false,
                },
            }, {});
            const parasiteIds = parasiteList.map((ele) => ele.id);
            if (parasiteIds.length > 0) {
                await context.operate('parasite', {
                    id: await generateNewIdAsync(),
                    action: 'update',
                    data: {
                        expired: true,
                    },
                    filter: {
                        id: {
                            $in: parasiteIds
                        }
                    },
                }, { blockTrigger: true });
                await context.operate('token', {
                    id: await generateNewIdAsync(),
                    action: 'disable',
                    data: {},
                    filter: {
                        ableState: 'enabled',
                        entity: 'parasite',
                        entityId: {
                            $in: parasiteIds
                        }
                    },
                }, { blockTrigger: true });
            }
            // operation的级联写法目前不能正确解析上层对象对下层对象的filter关系
            // data.parasite$user = { 
            //     id: await generateNewIdAsync(),
            //     action: 'update',
            //     data: {
            //         expired: true,
            //         token$entity: {
            //             id: await generateNewIdAsync(),
            //             action: 'disable',
            //             data: {},
            //             filter: {
            //                 ableState: 'enabled',
            //                 parasite: {
            //                     userId: {
            //                         $in: {
            //                             entity: 'user',
            //                             data: {
            //                                 id: 1,
            //                             },
            //                             filter,
            //                         }
            //                     }
            //                 }
            //             }
            //         },
            //     },
            //     filter: {
            //         userId: {
            //             $in: {
            //                 entity: 'user',
            //                 data: {
            //                     id: 1,
            //                 },
            //                 filter,
            //             }
            //         }
            //     }
            // };
            return 1;
        },
    },
];
export default triggers;
