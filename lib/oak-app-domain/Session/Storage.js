"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["application"]
        },
        entityId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        userId: {
            type: "ref",
            ref: "user"
        },
        lmts: {
            type: "datetime"
        },
        openId: {
            type: "varchar",
            params: {
                length: 32
            }
        }
    },
    actionType: "crud",
    actions: action_1.genericActions,
    relation: ["partner"]
};
