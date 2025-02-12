"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const Action_1 = require("./Action");
exports.desc = {
    attributes: {
        applicationId: {
            type: "ref",
            ref: "application"
        },
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["email", "mobile", "parasite", "wechatUser"]
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
        playerId: {
            type: "ref",
            ref: "user"
        },
        disablesAt: {
            type: "datetime"
        },
        env: {
            notNull: true,
            type: "object"
        },
        refreshedAt: {
            notNull: true,
            type: "datetime"
        },
        value: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
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
            name: 'index_value',
            attributes: [
                {
                    name: 'value',
                },
                {
                    name: '$$deleteAt$$',
                },
            ],
            config: {
                unique: true,
            },
        }
    ]
};
