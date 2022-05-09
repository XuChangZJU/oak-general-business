"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = exports.users = void 0;
const constants_1 = require("../constants");
exports.users = [
    {
        password: 'oak@2022',
        nickname: 'root',
        name: 'root',
        id: constants_1.ROOT_USER_ID,
    }
];
exports.roles = [
    {
        name: 'root',
        id: constants_1.ROOT_ROLE_ID,
    }
];
// 由触发器默认创建
/* export const userRoles: Array<UserRoleCreate> = [
    {
        userId: ROOT_USER_ID,
        roleId: ROOT_ROLE_ID,
        relation: 'owner',
        id: 'root_user_role',
    }
]; */
