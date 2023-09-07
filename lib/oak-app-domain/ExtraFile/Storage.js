"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        origin: {
            notNull: true,
            type: "enum",
            enumeration: ["qiniu", "unknown"]
        },
        type: {
            notNull: true,
            type: "enum",
            enumeration: ["image", "video", "audio", "file"]
        },
        bucket: {
            notNull: true,
            type: "varchar",
            params: {
                length: 16
            }
        },
        objectId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        tag1: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        tag2: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        filename: {
            notNull: true,
            type: "varchar",
            params: {
                length: 256
            }
        },
        md5: {
            type: "text"
        },
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["article", "articleMenu", "user"]
        },
        entityId: {
            notNull: true,
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
            type: "decimal",
            params: {
                precision: 22,
                scale: 10
            }
        },
        fileType: {
            type: "varchar",
            params: {
                length: 128
            }
        },
        isBridge: {
            type: "boolean"
        },
        uploaded: {
            type: "boolean"
        },
        uploadMeta: {
            type: "object"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions
};
