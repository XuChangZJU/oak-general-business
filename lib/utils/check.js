"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsRoot = void 0;
const constants_1 = require("../constants");
async function checkIsRoot(context) {
    const token = await context.getToken();
    if (!token) {
        return false;
    }
    const { playerId } = token;
    const count = await context.rowStore.count('userRole', {
        filter: {
            userId: playerId,
            roleId: constants_1.ROOT_ROLE_ID,
        },
    }, context);
    if (count === 0) {
        // 只有root允许扮演其他用户身份
        return false;
    }
    return true;
}
exports.checkIsRoot = checkIsRoot;
