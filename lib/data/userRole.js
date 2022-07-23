"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokens = exports.mobiles = exports.roles = exports.users = void 0;
var constants_1 = require("../constants");
var DEV_ID_1 = require("./DEV-ID");
exports.users = [
    {
        password: 'oak@2022',
        nickname: 'root',
        name: 'root',
        id: constants_1.ROOT_USER_ID,
        systemId: DEV_ID_1.DEV_SYSTEM_ID,
    }
];
exports.roles = [
    {
        name: 'root',
        id: constants_1.ROOT_ROLE_ID,
    }
];
exports.mobiles = [
    {
        mobile: '13000000000',
        id: constants_1.ROOT_MOBILE_ID,
        userId: constants_1.ROOT_USER_ID,
    }
];
exports.tokens = [
    {
        entity: 'mobile',
        entityId: constants_1.ROOT_MOBILE_ID,
        id: constants_1.ROOT_TOKEN_ID,
        env: {
            type: 'server',
        },
        userId: constants_1.ROOT_USER_ID,
        playerId: constants_1.ROOT_USER_ID,
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
