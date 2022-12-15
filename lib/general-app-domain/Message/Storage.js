"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var Action_1 = require("./Action");
exports.desc = {
    attributes: {
        userId: {
            type: "ref",
            ref: "user"
        },
        systemId: {
            type: "ref",
            ref: "system"
        },
        type: {
            type: "varchar",
            params: {
                length: 24
            }
        },
        weight: {
            type: "varchar",
            params: {
                length: 24
            }
        },
        props: {
            type: "object"
        },
        data: {
            type: "object"
        },
        params: {
            type: "object"
        },
        iState: {
            type: "varchar",
            params: {
                length: 24
            }
        }
    },
    actionType: "crud",
    actions: Action_1.actions
};
