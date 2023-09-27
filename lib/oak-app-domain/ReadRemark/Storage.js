"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        userId: {
            notNull: true,
            type: "ref",
            ref: "user"
        },
        sessionId: {
            notNull: true,
            type: "ref",
            ref: "session"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
