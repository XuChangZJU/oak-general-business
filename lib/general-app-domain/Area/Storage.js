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
        level: {
            notNull: true,
            type: "enum",
            enumeration: ["province", "city", "district", "street", "country"]
        },
        depth: {
            notNull: true,
            type: "int",
            params: {
                width: 4
            }
        },
        parentId: {
            type: "ref",
            ref: "area"
        },
        code: {
            notNull: true,
            type: "varchar",
            params: {
                length: 12
            }
        },
        center: {
            notNull: true,
            type: "geometry"
        }
    },
    static: true,
    actionType: "readOnly",
    actions: action_1.readOnlyActions
};
