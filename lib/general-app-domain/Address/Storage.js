"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        detail: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        areaId: {
            notNull: true,
            type: "ref",
            ref: "area"
        },
        phone: {
            notNull: true,
            type: "varchar",
            params: {
                length: 12
            }
        },
        name: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        default: {
            notNull: true,
            type: "boolean"
        },
        remark: {
            notNull: true,
            type: "text"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
