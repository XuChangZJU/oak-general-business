"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        name: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        level: {
            type: "enum",
            enumeration: ["province", "city", "district", "street", "country"]
        },
        depth: {
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
            type: "varchar",
            params: {
                length: 12
            }
        },
        center: {
            type: "geometry"
        }
    },
    static: true,
    actionType: "readOnly",
    actions: action_1.readOnlyActions
};
