"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        origin: {
            notNull: true,
            type: "enum",
            enumeration: ["qiniu", "wechat", "unknown", "ctyun"]
        },
        type: {
            notNull: true,
            type: "enum",
            enumeration: ["image", "video", "audio", "file"]
        },
        bucket: {
            type: "varchar",
            params: {
                length: 32
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
            ref: ["article", "articleMenu", "sessionMessage", "user"]
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
        extra2: {
            type: "object"
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
        uploadState: {
            notNull: true,
            type: "enum",
            enumeration: ["success", "failed", "uploading"]
        },
        uploadMeta: {
            type: "object"
        },
        applicationId: {
            notNull: true,
            type: "ref",
            ref: "application"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions,
    indexes: [
        {
            name: 'objectId_deleteAt',
            attributes: [
                {
                    name: 'objectId',
                },
                {
                    name: '$$deleteAt$$',
                }
            ]
        }
    ]
};
