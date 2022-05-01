"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
let NO_ANY_USER = true;
const triggers = [
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
                            $ne: constants_1.ROOT_USER_ID,
                        },
                    },
                    indexFrom: 0,
                    count: 1,
                }, context);
                if (result.length === 0) {
                    const { data } = operation;
                    const userData = data instanceof Array ? data[0] : data;
                    const userRoleData = {
                        id: await generateNewId(),
                        userId: userData.id,
                        roleId: constants_1.ROOT_ROLE_ID,
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
exports.default = triggers;
