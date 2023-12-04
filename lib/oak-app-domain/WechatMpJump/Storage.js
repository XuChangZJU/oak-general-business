"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        messageId: {
            type: "ref",
            ref: "message"
        },
        jump_wxa: {
            type: "object"
        },
        openlink: {
            type: "varchar",
            params: {
                length: 256
            }
        },
        expireType: {
            type: "int",
            params: {
                width: 1,
                signed: true
            }
        },
        expireInterval: {
            type: "int",
            params: {
                width: 2,
                signed: true
            }
        },
        expiresAt: {
            type: "datetime"
        },
        expired: {
            type: "boolean"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions,
    indexes: [
        {
            name: 'index_uuid',
            attributes: [
                {
                    name: 'expired',
                },
                {
                    name: 'expiresAt',
                },
            ],
        }
    ]
};
