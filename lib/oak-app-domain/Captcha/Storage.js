"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const Action_1 = require("./Action");
exports.desc = {
    attributes: {
        mobile: {
            notNull: true,
            type: "varchar",
            params: {
                length: 11
            }
        },
        code: {
            notNull: true,
            type: "varchar",
            params: {
                length: 4
            }
        },
        visitorId: {
            notNull: true,
            type: "text"
        },
        reason: {
            type: "text"
        },
        env: {
            notNull: true,
            type: "object"
        },
        expired: {
            notNull: true,
            type: "boolean"
        },
        expiresAt: {
            notNull: true,
            type: "datetime"
        },
        type: {
            notNull: true,
            type: "enum",
            enumeration: ["login", "changePassword", "confirm"]
        },
        iState: {
            type: "enum",
            enumeration: ["unsent", "sending", "sent", "failure"]
        }
    },
    actionType: "crud",
    actions: Action_1.actions,
    indexes: [
        {
            name: 'index_mobile_code',
            attributes: [
                {
                    name: 'mobile',
                    direction: 'ASC'
                },
                {
                    name: 'code',
                    direction: 'ASC'
                },
                {
                    name: '$$createAt$$',
                    direction: 'DESC'
                }
            ]
        }
    ]
};
