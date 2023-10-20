"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const Action_1 = require("./Action");
exports.desc = {
    attributes: {
        title: {
            notNull: true,
            type: "text"
        },
        description: {
            type: "text"
        },
        targetEntity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        action: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        redirectTo: {
            notNull: true,
            type: "object"
        },
        iState: {
            type: "enum",
            enumeration: ["active", "done"]
        }
    },
    actionType: "crud",
    actions: Action_1.actions,
    relation: ['collaborator']
};
