"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        name: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        description: {
            notNull: true,
            type: "text"
        },
        config: {
            notNull: true,
            type: "object"
        },
        platformId: {
            type: "ref",
            ref: "platform"
        },
        folder: {
            notNull: true,
            type: "varchar",
            params: {
                length: 16
            }
        },
        super: {
            type: "boolean"
        },
        style: {
            type: "object"
        },
        entity: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        entityId: {
            type: "varchar",
            params: {
                length: 64
            }
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
