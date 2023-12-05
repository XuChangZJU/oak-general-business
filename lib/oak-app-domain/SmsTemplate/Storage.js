"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        systemId: {
            notNull: true,
            type: "ref",
            ref: "system"
        },
        origin: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        templateName: {
            notNull: true,
            type: "text"
        },
        templateCode: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        templateContent: {
            notNull: true,
            type: "text"
        },
        syncAt: {
            notNull: true,
            type: "datetime"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
