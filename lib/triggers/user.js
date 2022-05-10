"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const constants_1 = require("../constants");
let NO_ANY_USER = true;
const triggers = [
    {
        name: '系统生成的第一个用户默认注册为root，用户的初始状态默认为shadow',
        entity: 'user',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data } = operation;
            const setDefaultState = (userData) => {
                if (!userData.userState) {
                    userData.userState = 'shadow';
                }
            };
            if (data instanceof Array) {
                data.forEach(ele => setDefaultState(ele));
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
                            $ne: constants_1.ROOT_USER_ID,
                        },
                    },
                    indexFrom: 0,
                    count: 1,
                }, context, params);
                if (result.length === 0) {
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
    },
    {
        name: '当扮演某个用户时，切换当前用户的token中的userId',
        entity: 'user',
        action: 'play',
        when: 'after',
        fn: async ({ operation }, context, params) => {
            const { filter } = operation;
            (0, assert_1.default)(filter.id);
            const { id } = (await context.getToken());
            await context.rowStore.operate('token', {
                action: 'update',
                data: {
                    userId: filter.id,
                },
                filter: {
                    id,
                }
            }, context);
            return 1;
        }
    }
];
exports.default = triggers;
