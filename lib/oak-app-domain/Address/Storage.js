"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const action_1 = require("oak-domain/lib/actions/action");
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
        },
        entity: {
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["user"]
        },
        entityId: {
            type: "varchar",
            params: {
                length: 64
            }
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
