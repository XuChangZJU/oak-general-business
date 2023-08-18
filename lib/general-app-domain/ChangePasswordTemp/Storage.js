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
        prevPassword: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        newPassword: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        result: {
            notNull: true,
            type: "enum",
            enumeration: ["success", "fail"]
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
