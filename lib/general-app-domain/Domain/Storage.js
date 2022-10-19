"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        url: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        apiPath: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        protocol: {
            type: "varchar",
            params: {
                length: 24
            }
        },
        port: {
            type: "int",
            params: {
                width: 2,
                signed: true
            }
        },
        systemId: {
            type: "ref",
            ref: "system"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
