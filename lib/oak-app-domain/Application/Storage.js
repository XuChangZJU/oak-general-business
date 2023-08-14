"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        name: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        description: {
            notNull: true,
            type: "text"
        },
        type: {
            notNull: true,
            type: "enum",
            enumeration: ["web", "wechatMp", "wechatPublic"]
        },
        systemId: {
            notNull: true,
            type: "ref",
            ref: "system"
        },
        config: {
            notNull: true,
            type: "object"
        },
        style: {
            type: "object"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
