"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        wechatPublicTagId: {
            type: "ref",
            ref: "wechatPublicTag"
        },
        userId: {
            type: "ref",
            ref: "user"
        },
        sync: {
            type: "boolean"
        },
        syncAt: {
            type: "datetime"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
