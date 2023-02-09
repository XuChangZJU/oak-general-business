"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        messageId: {
            type: "ref",
            ref: "message"
        },
        systemId: {
            type: "ref",
            ref: "system"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
