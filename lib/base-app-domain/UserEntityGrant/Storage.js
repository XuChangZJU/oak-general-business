"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
exports.desc = {
    attributes: {
        entity: {
            type: "varchar",
            params: {
                width: 32
            }
        },
        entityId: {
            type: "varchar",
            params: {
                width: 64
            }
        },
        relation: {
            type: "varchar",
            params: {
                width: 32
            }
        },
        type: {
            type: "varchar",
            params: {
                length: 16
            }
        },
        number: {
            type: "int",
            params: {
                width: 2,
                signed: true
            }
        },
        confirmed: {
            type: "int",
            params: {
                width: 2,
                signed: true
            }
        },
        remark: {
            type: "text"
        },
        granterId: {
            type: "ref",
            ref: "user"
        },
        granteeId: {
            type: "ref",
            ref: "user"
        },
        expiresAt: {
            type: "datetime"
        },
        expired: {
            type: "boolean"
        }
    },
    indexes: [
        {
            name: 'index_entity_entityId',
            attributes: [
                {
                    name: 'entity'
                },
                {
                    name: 'entityId'
                },
            ]
        },
        {
            name: 'index_uuid',
            attributes: [
                {
                    name: 'expired'
                },
                {
                    name: 'expiresAt'
                }
            ]
        }
    ]
};
