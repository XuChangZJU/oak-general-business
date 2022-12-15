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
            type: "varchar",
            params: {
                length: 32
            }
        },
        author: {
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
