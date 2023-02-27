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
        userId: {
            type: "ref",
            ref: "user"
        },
        type: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        weight: {
            type: "varchar",
            params: {
                length: 24
            }
        },
        restriction: {
            type: "object"
        },
        title: {
            type: "varchar",
            params: {
                length: 256
            }
        },
        content: {
            type: "text"
        },
        data: {
            type: "object"
        },
        router: {
            type: "object"
        },
        iState: {
            type: "varchar",
            params: {
                length: 24
            }
        },
        visitState: {
            type: "varchar",
            params: {
                length: 24
            }
        }
    },
    actionType: "crud",
    actions: Action_1.actions
};
