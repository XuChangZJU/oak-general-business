"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = exports.actions = void 0;
var IActionDef = {
    stm: {
        send: ['unsent', 'sending'],
        success: ['sending', 'sent'],
        fail: ['sending', 'failure']
    },
    is: 'unsent'
};
exports.actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "send", "success", "fail"];
exports.ActionDefDict = {
    iState: IActionDef
};
