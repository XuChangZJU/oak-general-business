"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        detail: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        areaId: {
            type: "ref",
            ref: "area"
        },
        phone: {
            type: "varchar",
            params: {
                length: 12
            }
        },
        name: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        default: {
            type: "boolean"
        },
        remark: {
            type: "text"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
