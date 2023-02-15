"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = exports.actions = void 0;
exports.actions = ["count", "stat", "download", "select", "create", "remove", "update", "succeed", "fail", "visit"];
var IActionDef = {
    stm: {
        succeed: ['sending', 'success'],
        fail: ['sending', 'failure']
    },
    is: 'sending'
};
var VisitActionDef = {
    stm: {
        visit: ['unvisited', 'visited']
    },
    is: 'unvisited'
};
exports.ActionDefDict = {
    iState: IActionDef,
    visitState: VisitActionDef
};
