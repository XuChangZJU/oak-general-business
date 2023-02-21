"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
var Action_1 = require("./Action");
exports.desc = {
    attributes: {
        entity: {
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["role"]
        },
        entityId: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        relation: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        type: {
            type: "enum",
            enumeration: ["grant", "transfer"]
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
        qrCodeType: {
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
