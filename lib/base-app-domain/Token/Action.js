"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = void 0;
const action_1 = require("oak-domain/lib/actions/action");
const AbleActionDef = (0, action_1.makeAbleActionDef)('enabled');
exports.ActionDefDict = {
    ableState: AbleActionDef
};
