"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCheckers = void 0;
const lodash_1 = require("lodash");
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
function processCheckers(checkers) {
    // 对user类型的checker，加上root的自动检测
    for (const checker of checkers) {
        const { type, checker: fn } = checker;
        if (type === 'user') {
            (0, lodash_1.assign)(checker, {
                checker: async (dummy, context) => {
                    if (await checkIsRoot(context)) {
                        return;
                    }
                    await fn(dummy, context);
                },
            });
        }
    }
}
exports.processCheckers = processCheckers;
