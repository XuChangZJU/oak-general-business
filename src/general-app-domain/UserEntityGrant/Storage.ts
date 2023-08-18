import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { actions } from "./Action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["role"]
        },
        entityId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        relation: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
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
    actions,
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