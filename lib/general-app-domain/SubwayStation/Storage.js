"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        stationId: {
            notNull: true,
            type: "ref",
            ref: "station"
        },
        subwayId: {
            notNull: true,
            type: "ref",
            ref: "subway"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
