"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var Action_1 = require("./Action");
exports.desc = {
    attributes: {
        entity: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        entityId: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        title: {
            notNull: true,
            type: "varchar",
            params: {
                length: 128
            }
        },
        author: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        abstract: {
            type: "text"
        },
        content: {
            type: "text"
        },
        url: {
            type: "text"
        },
        sign: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        iState: {
            type: "enum",
            enumeration: ["online", "offline", "disabled"]
        }
    },
    actionType: "crud",
    actions: Action_1.actions
};
