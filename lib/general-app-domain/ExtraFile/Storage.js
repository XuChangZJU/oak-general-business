"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        origin: {
            type: "enum",
            enumeration: ["qiniu", "unknown"]
        },
        type: {
            type: "enum",
            enumeration: ["image", "video", "audio", "file"]
        },
        bucket: {
            type: "varchar",
            params: {
                length: 16
            }
        },
        objectId: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        tag1: {
            type: "varchar",
            params: {
                length: 16
            }
        },
        tag2: {
            type: "varchar",
            params: {
                length: 16
            }
        },
        filename: {
            type: "varchar",
            params: {
                length: 256
            }
        },
        md5: {
            type: "text"
        },
        entity: {
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["article", "user"]
        },
        entityId: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        extra1: {
            type: "text"
        },
        extension: {
            type: "varchar",
            params: {
                length: 16
            }
        },
        size: {
            type: "int",
            params: {
                width: 4,
                signed: true
            }
        },
        sort: {
            type: "int",
            params: {
                width: 4,
                signed: true
            }
        },
        fileType: {
            type: "varchar",
            params: {
                length: 128
            }
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
