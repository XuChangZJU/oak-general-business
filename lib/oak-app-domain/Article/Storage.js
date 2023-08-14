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
        content: {
            notNull: true,
            type: "text"
        },
        articleMenuId: {
            notNull: true,
            type: "ref",
            ref: "articleMenu"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
