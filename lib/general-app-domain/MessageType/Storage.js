"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        name: {
            type: "varchar",
            params: {
                length: 24
            }
        },
        template: {
            type: "text"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
