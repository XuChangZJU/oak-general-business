"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        menuId: {
            type: "int",
            params: {
                width: 4,
                signed: true
            }
        },
        menuConfig: {
            notNull: true,
            type: "object"
        },
        applicationId: {
            notNull: true,
            type: "ref",
            ref: "application"
        },
        publishState: {
            notNull: true,
            type: "enum",
            enumeration: ["wait", "success", "fail"]
        },
        wechatPublicTagId: {
            type: "ref",
            ref: "wechatPublicTag"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
