"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = exports.actions = void 0;
exports.actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "succeed", "fail", "visit"];
const IActionDef = {
    stm: {
        succeed: ['sending', 'success'],
        fail: ['sending', 'failure'],
    },
};
const VisitActionDef = {
    stm: {
        visit: ['unvisited', 'visited'],
    },
    is: 'unvisited',
};
exports.ActionDefDict = {
    iState: IActionDef,
    visitState: VisitActionDef
};
