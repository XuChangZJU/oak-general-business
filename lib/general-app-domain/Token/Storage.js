"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var Action_1 = require("./Action");
exports.desc = {
    attributes: {
        applicationId: {
            type: "ref",
            ref: "application"
        },
        entity: {
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["email", "mobile", "wechatUser"]
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
        playerId: {
            type: "ref",
            ref: "user"
        },
        env: {
            type: "object"
        },
        ableState: {
            type: "varchar",
            params: {
                length: 24
            },
            enumeration: ["enabled", "disabled"]
        }
    },
    actionType: "crud",
    actions: Action_1.actions
};
