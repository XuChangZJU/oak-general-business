"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        applicationId: {
            notNull: true,
            type: "ref",
            ref: "application"
        },
        sessionId: {
            notNull: true,
            type: "ref",
            ref: "session"
        },
        userId: {
            type: "ref",
            ref: "user"
        },
        wechatUserId: {
            type: "ref",
            ref: "wechatUser"
        },
        createTime: {
            type: "datetime"
        },
        type: {
            notNull: true,
            type: "enum",
            enumeration: ["text", "image", "audio", "video", "news"]
        },
        text: {
            type: "text"
        },
        news: {
            type: "varchar",
            params: {
                length: 128
            }
        },
        aaoe: {
            type: "boolean"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
