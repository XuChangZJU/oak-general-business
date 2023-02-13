"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = exports.actions = void 0;
exports.actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "succeed", "fail"];
var IActionDef = {
    stm: {
        succeed: ['sending', 'success'],
        fail: ['sending', 'failure']
    },
    is: 'sending'
};
exports.ActionDefDict = {
    iState: IActionDef
};
