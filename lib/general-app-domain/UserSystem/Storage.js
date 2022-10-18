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
        systemId: {
            type: "ref",
            ref: "system"
        },
        relation: {
            type: "varchar",
            params: {
                length: 24
            }
        }
    },
    actionType: "excludeUpdate",
    actions: action_1.excludeUpdateActions
};
