"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actionDef_1 = require("oak-domain/lib/store/actionDef");
const types_1 = require("oak-domain/lib/types");
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
        checker: async () => {
            // 只有root才能play
            throw new types_1.OakUserUnpermittedException();
        },
    },
    {
        type: 'data',
        action: 'play',
        entity: 'user',
        checker: async ({ operation }, context) => {
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
