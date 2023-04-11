"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        wechatPublicTagId: {
            notNull: true,
            type: "ref",
            ref: "wechatPublicTag"
        },
        userId: {
            notNull: true,
            type: "ref",
            ref: "user"
        },
        sync: {
            notNull: true,
            type: "boolean"
        },
        syncAt: {
            notNull: true,
            type: "datetime"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
