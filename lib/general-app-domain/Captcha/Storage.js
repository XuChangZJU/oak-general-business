"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var Action_1 = require("./Action");
exports.desc = {
    attributes: {
        mobile: {
            type: "varchar",
            params: {
                length: 11
            }
        },
        code: {
            type: "varchar",
            params: {
                length: 4
            }
        },
        visitorId: {
            type: "text"
        },
        reason: {
            type: "text"
        },
        env: {
            type: "object"
        },
        expired: {
            type: "boolean"
        },
        expiresAt: {
            type: "datetime"
        },
        iState: {
            type: "varchar",
            params: {
                length: 16
            }
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
