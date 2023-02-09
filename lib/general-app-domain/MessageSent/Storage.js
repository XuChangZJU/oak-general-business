"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var Action_1 = require("./Action");
exports.desc = {
    attributes: {
        channel: {
            type: "object"
        },
        applicationId: {
            type: "ref",
            ref: "application"
        },
        data: {
            type: "object"
        },
        messageSystemId: {
            type: "ref",
            ref: "messageSystem"
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
