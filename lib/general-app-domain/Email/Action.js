"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = exports.actions = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.actions = ["count", "stat", "download", "select", "create", "remove", "update", "enable", "disable"];
var AbleActionDef = (0, action_1.makeAbleActionDef)('enabled');
exports.ActionDefDict = {
    ableState: AbleActionDef
};
