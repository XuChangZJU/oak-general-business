"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actionDef_1 = require("oak-domain/lib/store/actionDef");
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
    }
];
exports.default = checkers;
