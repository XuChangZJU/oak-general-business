"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actionDef_1 = require("oak-domain/lib/store/actionDef");
const types_1 = require("oak-domain/lib/types");
const check_1 = require("../utils/check");
const checkers = [
    {
        type: 'data',
        action: 'remove',
        entity: 'user',
        checker: async ({ operation }, context) => {
            const { filter } = operation;
            await (0, actionDef_1.checkFilterContains)('user', context.rowStore.getSchema(), {
                idState: 'shadow',
            }, context, filter);
            return 0;
        },
    },
    {
        type: 'user',
        action: 'play',
        entity: 'user',
        checker: async ({ operation }, context) => {
            const isRoot = await (0, check_1.checkIsRoot)(context);
            if (!isRoot) {
                throw new types_1.OakUserUnpermittedException();
            }
            const token = await context.getToken();
            const { userId } = token;
            if (userId === operation.filter.id) {
                throw new types_1.OakRowInconsistencyException();
            }
            return 0;
        },
    }
];
exports.default = checkers;
