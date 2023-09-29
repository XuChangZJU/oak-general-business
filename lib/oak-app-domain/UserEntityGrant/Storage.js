"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const Action_1 = require("./Action");
exports.desc = {
    attributes: {
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["session"]
        },
        entityId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        relationId: {
            notNull: true,
            type: "ref",
            ref: "relation"
        },
        type: {
            notNull: true,
            type: "enum",
            enumeration: ["grant", "transfer"]
        },
        number: {
            notNull: true,
            type: "int",
            params: {
                width: 2,
                signed: true
            }
        },
        confirmed: {
            notNull: true,
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
            notNull: true,
            type: "ref",
            ref: "user"
        },
        granteeId: {
            type: "ref",
            ref: "user"
        },
        qrCodeType: {
            notNull: true,
            type: "enum",
            enumeration: ["wechatMpDomainUrl", "wechatMpWxaCode", "wechatPublic", "wechatPublicForMp", "webForWechatPublic"]
        },
        expiresAt: {
            type: "datetime"
        },
        expired: {
            type: "boolean"
        },
        redirectTo: {
            type: "object"
        }
    },
    actionType: "crud",
    actions: Action_1.actions,
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
