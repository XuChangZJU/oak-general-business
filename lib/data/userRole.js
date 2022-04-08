"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoles = exports.roles = exports.users = void 0;
const constants_1 = require("../constants");
exports.users = [
    {
        password: 'oak@2022',
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
exports.userRoles = [
    {
        userId: constants_1.ROOT_USER_ID,
        roleId: constants_1.ROOT_ROLE_ID,
        relation: 'owner',
        id: 'root_user_role',
    }
];
