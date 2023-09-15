"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = exports.actions = void 0;
const action_1 = require("oak-domain/lib/actions/action");
exports.actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "enable", "disable"];
const AbleActionDef = (0, action_1.makeAbleActionDef)('enabled');
exports.ActionDefDict = {
    ableState: AbleActionDef
};
