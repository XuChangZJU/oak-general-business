"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = exports.actions = void 0;
const IActionDef = {
    stm: {
        complete: ['active', 'done'],
    },
};
exports.actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "complete"];
exports.ActionDefDict = {
    iState: IActionDef
};
