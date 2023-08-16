"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var Action_1 = require("./Action");
exports.desc = {
    attributes: {
        userId: {
            notNull: true,
            type: "ref",
            ref: "user"
        },
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
        showTip: {
            type: "boolean"
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
        },
        multiple: {
            type: "boolean"
        },
        tokenLifeLength: {
            type: "int",
            params: {
                width: 4,
                signed: true
            }
        }
    },
    actionType: "crud",
    actions: Action_1.actions
};
