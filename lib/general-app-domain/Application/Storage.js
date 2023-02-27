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
        type: {
            type: "varchar",
            params: {
                length: 24
            }
        },
        systemId: {
            type: "ref",
            ref: "system"
        },
        config: {
            type: "object"
        },
        style: {
            type: "object"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
