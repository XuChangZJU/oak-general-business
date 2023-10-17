"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const Action_1 = require("./Action");
exports.desc = {
    attributes: {
        total: {
            notNull: true,
            type: "money"
        },
        avail: {
            notNull: true,
            type: "money"
        },
        entity: {
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["user"]
        },
        entityId: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        ableState: {
            type: "enum",
            enumeration: ["enabled", "disabled"]
        }
    },
    actionType: "crud",
    actions: Action_1.actions,
    relation: ["owner", "audit"]
};
