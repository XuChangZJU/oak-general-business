"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selectionRewriter_1 = require("../utils/selectionRewriter");
const startRoutines = [
    {
        name: '注入对合并的user的selection的改写',
        routine: async (context) => {
            context.rowStore.registerSelectionRewriter(selectionRewriter_1.rewriteSelection);
            context.rowStore.registerOperationRewriter(selectionRewriter_1.rewriteOperation);
            return {};
        },
    }
];
exports.default = startRoutines;
