"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = exports.actions = void 0;
var IActionDef = {
    stm: {
        online: ['offline', 'online'],
        offline: ['online', 'offline'],
        disabled: [['online', 'offline'], 'disabled'],
    },
    is: 'offline',
};
exports.actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "online", "offline", "disabled"];
exports.ActionDefDict = {
    iState: IActionDef
};
