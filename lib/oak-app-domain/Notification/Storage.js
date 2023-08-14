"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var Action_1 = require("./Action");
exports.desc = {
    attributes: {
        channel: {
            notNull: true,
            type: "enum",
            enumeration: ["wechatPublic", "jPush", "jim", "wechatMp", "sms"]
        },
        applicationId: {
            type: "ref",
            ref: "application"
        },
        data: {
            type: "object"
        },
        messageSystemId: {
            notNull: true,
            type: "ref",
            ref: "messageSystem"
        },
        data1: {
            type: "object"
        },
        data2: {
            type: "object"
        },
        templateId: {
            type: "varchar",
            params: {
                length: 128
            }
        },
        iState: {
            type: "enum",
            enumeration: ["sending", "success", "failure"]
        }
    },
    actionType: "crud",
    actions: Action_1.actions
};
