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
            }
        },
        entityId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        relationEntity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        relationEntityFilter: {
            notNull: true,
            type: "object"
        },
        relationIds: {
            notNull: true,
            type: "object"
        },
        type: {
            notNull: true,
            type: "enum",
            enumeration: ["grant", "transfer"]
        },
        rule: {
            notNull: true,
            type: "enum",
            enumeration: ["single", "all", "free"]
        },
        ruleOnRow: {
            notNull: true,
            type: "enum",
            enumeration: ["single", "all", "free"]
        },
        multiple: {
            type: "boolean"
        },
        remark: {
            type: "text"
        },
        granterId: {
            notNull: true,
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
        },
        claimUrl: {
            notNull: true,
            type: "varchar",
            params: {
                length: 128
            }
        }
    },
    actionType: "crud",
    actions,
    indexes: [
        {
            name: 'index_expired_expiredAt',
            attributes: [
                {
                    name: 'expired',
                },
                {
                    name: 'expiresAt',
                }
            ],
        }
    ]
};