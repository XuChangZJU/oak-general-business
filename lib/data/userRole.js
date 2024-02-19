"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokens = exports.mobiles = exports.users = void 0;
const constants_1 = require("../constants");
exports.users = [
    {
        password: '',
        nickname: 'root',
        name: 'root',
        isRoot: true,
        id: constants_1.ROOT_USER_ID,
        userState: 'shadow',
        idState: 'unverified',
    },
];
exports.mobiles = [
    {
        mobile: 'root_mobile',
        id: constants_1.ROOT_MOBILE_ID,
        userId: constants_1.ROOT_USER_ID,
    },
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
        refreshedAt: Date.now(),
        value: constants_1.ROOT_TOKEN_ID,
    }
];
