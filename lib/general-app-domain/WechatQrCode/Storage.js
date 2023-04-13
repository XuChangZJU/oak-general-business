"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["user", "userEntityGrant"]
        },
        entityId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        type: {
            notNull: true,
            type: "enum",
            enumeration: ["wechatMpDomainUrl", "wechatMpWxaCode", "wechatPublic", "wechatPublicForMp", "webForWechatPublic"]
        },
        allowShare: {
            notNull: true,
            type: "boolean"
        },
        tag: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        tag2: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        expiresAt: {
            type: "datetime"
        },
        expired: {
            type: "boolean"
        },
        ticket: {
            type: "text"
        },
        url: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        permanent: {
            type: "boolean"
        },
        buffer: {
            type: "text"
        },
        applicationId: {
            notNull: true,
            type: "ref",
            ref: "application"
        },
        props: {
            notNull: true,
            type: "object"
        }
    },
    actionType: "crud",
    actions: action_1.genericActions,
    indexes: [
        {
            name: 'index_entity_entityId_tag',
            attributes: [
                {
                    name: 'entity'
                },
                {
                    name: 'entityId'
                },
                {
                    name: 'tag'
                }
            ]
        },
        {
            name: 'index_expired_expiresAt',
            attributes: [
                {
                    name: 'expired'
                },
                {
                    name: 'expiresAt'
                },
            ]
        },
        {
            name: 'index_url',
            attributes: [
                {
                    name: 'url'
                },
            ]
        }
    ]
};
