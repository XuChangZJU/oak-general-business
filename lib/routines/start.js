"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var selectionRewriter_1 = require("../utils/selectionRewriter");
var startRoutines = [
    {
        name: '注入对合并的user的selection的改写',
        fn: function (context) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                context.rowStore.registerSelectionRewriter(selectionRewriter_1.rewriteSelection);
                context.rowStore.registerOperationRewriter(selectionRewriter_1.rewriteOperation);
                return [2 /*return*/, '注入成功'];
            });
        }); },
    }
];
exports.default = startRoutines;
