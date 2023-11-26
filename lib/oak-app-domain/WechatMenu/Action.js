"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = exports.actions = void 0;
const IActionDef = {
    stm: {
        success: [['wait', 'fail'], 'success'],
        fail: [['wait', 'success'], 'fail']
    },
    is: 'wait'
};
exports.actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "success", "fail", "publish"];
exports.ActionDefDict = {
    iState: IActionDef
};
