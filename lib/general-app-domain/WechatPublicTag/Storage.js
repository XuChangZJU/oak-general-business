"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        text: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        applicationId: {
            type: "ref",
            ref: "application"
        },
        wechatId: {
            type: "int",
            params: {
                width: 4,
                signed: false
            }
        },
        sync: {
            type: "boolean"
        },
        syncAt: {
            type: "datetime"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
