"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = exports.actions = void 0;
const IActionDef = {
    stm: {
        done: ['active', 'done'],
    },
};
exports.actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "done"];
exports.ActionDefDict = {
    iState: IActionDef
};
