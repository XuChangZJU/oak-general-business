"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDefDict = exports.actions = void 0;
const IdActionDef = {
    stm: {
        verify: ['unverified', 'verifying'],
        accept: [['unverified', 'verifying'], 'verified'],
        reject: [['verifying', 'verified'], 'unverified']
    },
    is: 'unverified'
};
const UserActionDef = {
    stm: {
        activate: ['shadow', 'normal'],
        disable: [['normal', 'shadow'], 'disabled'],
        enable: ['disabled', 'normal'],
        mergeTo: [['normal', 'shadow'], 'merged'],
        mergeFrom: ['normal', 'normal']
    }
};
exports.actions = ["count", "stat", "download", "select", "aggregate", "create", "remove", "update", "grant", "revoke", "activate", "disable", "enable", "mergeTo", "mergeFrom", "verify", "accept", "reject"];
exports.ActionDefDict = {
    idState: IdActionDef,
    userState: UserActionDef
};
