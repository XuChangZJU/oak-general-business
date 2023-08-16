import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["user", "userEntityGrant", "wechatLogin"]
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
                length: 256
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
    actions,
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