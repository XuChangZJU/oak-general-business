"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        type: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        templateId: {
            type: "varchar",
            params: {
                length: 128
            }
        },
        applicationId: {
            type: "ref",
            ref: "application"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
