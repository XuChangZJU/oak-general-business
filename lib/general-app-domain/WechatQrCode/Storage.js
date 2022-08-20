"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
exports.desc = {
    attributes: {
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
        type: {
            type: "varchar",
            params: {
                length: 16
            }
        },
        allowShare: {
            type: "boolean"
        },
        tag: {
            type: "varchar",
            params: {
                length: 32
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
            type: "ref",
            ref: "application"
        },
        props: {
            type: "object"
        }
    },
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
