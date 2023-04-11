"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        userId: {
            notNull: true,
            type: "ref",
            ref: "user"
        },
        roleId: {
            notNull: true,
            type: "ref",
            ref: "role"
        },
        relation: {
            notNull: true,
            type: "enum",
            enumeration: ["owner"]
        }
    },
    actionType: "excludeUpdate",
    actions: action_1.excludeUpdateActions
};
