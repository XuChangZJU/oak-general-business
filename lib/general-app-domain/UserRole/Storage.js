"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        userId: {
            type: "ref",
            ref: "user"
        },
        roleId: {
            type: "ref",
            ref: "role"
        },
        relation: {
            type: "varchar",
            params: {
                length: 16
            }
        }
    },
    actionType: "excludeUpdate",
    actions: action_1.excludeUpdateActions
};
