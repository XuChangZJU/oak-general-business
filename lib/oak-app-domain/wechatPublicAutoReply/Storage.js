"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        content: {
            notNull: true,
            type: "object"
        },
        applicationId: {
            notNull: true,
            type: "ref",
            ref: "application"
        },
        type: {
            notNull: true,
            type: "enum",
            enumeration: ["text", "image", "video", "voice"]
        },
        event: {
            notNull: true,
            type: "enum",
            enumeration: ["subscribe", "unsubscribe", "keyword", "auto"]
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
