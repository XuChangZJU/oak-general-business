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
        super: {
            type: "boolean"
        },
        domain: {
            type: "object"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
