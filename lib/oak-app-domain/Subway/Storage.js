"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        name: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        areaId: {
            notNull: true,
            type: "ref",
            ref: "area"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
