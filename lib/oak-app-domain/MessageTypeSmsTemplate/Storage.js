"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        type: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        templateId: {
            notNull: true,
            type: "ref",
            ref: "smsTemplate"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
