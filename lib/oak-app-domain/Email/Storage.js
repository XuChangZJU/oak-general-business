"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var Action_1 = require("./Action");
exports.desc = {
    attributes: {
        email: {
            notNull: true,
            type: "varchar",
            params: {
                length: 16
            }
        },
        userId: {
            notNull: true,
            type: "ref",
            ref: "user"
        },
        ableState: {
            type: "enum",
            enumeration: ["enabled", "disabled"]
        }
    },
    actionType: "crud",
    actions: Action_1.actions,
    indexes: [
        {
            name: 'index_email_ableState',
            attributes: [
                {
                    name: 'email',
                    direction: 'ASC',
                },
                {
                    name: 'ableState',
                    direction: 'ASC',
                }
            ],
        }
    ]
};
