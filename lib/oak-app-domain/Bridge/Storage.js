"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const Action_1 = require("./Action");
exports.desc = {
    attributes: {
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        entityId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        expiresAt: {
            notNull: true,
            type: "datetime"
        },
        expired: {
            notNull: true,
            type: "boolean"
        },
        redirectTo: {
            notNull: true,
            type: "object"
        }
    },
    actionType: "crud",
    actions: Action_1.actions
};
