"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        title: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        streamTitle: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        liveonly: {
            type: "enum",
            enumeration: ["online", "offline"]
        },
        hub: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        streamKey: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        entity: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        entityId: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        rtmpPushUrl: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        rtmpPlayUrl: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        pcPushUrl: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        expireAt: {
            type: "datetime"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
