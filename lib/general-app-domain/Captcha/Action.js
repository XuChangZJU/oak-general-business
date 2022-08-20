"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = void 0;
var IActionDef = {
    stm: {
        send: ['unsent', 'sending'],
        success: ['sending', 'sent'],
        fail: ['sending', 'failure']
    },
    is: 'unsent'
};
exports.ActionDefDict = {
    iState: IActionDef
};
