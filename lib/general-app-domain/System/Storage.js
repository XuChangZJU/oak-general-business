"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        name: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        description: {
            type: "text"
        },
        config: {
            type: "object"
        },
        platformId: {
            type: "ref",
            ref: "platform"
        },
        folder: {
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
