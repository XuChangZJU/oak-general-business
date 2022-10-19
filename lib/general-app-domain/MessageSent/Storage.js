"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var Action_1 = require("./Action");
exports.desc = {
    attributes: {
        channel: {
            type: "varchar",
            params: {
                length: 24
            }
        },
        data: {
            type: "object"
        },
        messageId: {
            type: "ref",
            ref: "message"
        },
        data1: {
            type: "object"
        },
        data2: {
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
