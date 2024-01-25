import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { actions } from "./Action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        applicationId: {
            type: "ref",
            ref: "application"
        },
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["email", "mobile", "parasite", "wechatUser"]
        },
        entityId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        userId: {
            type: "ref",
            ref: "user"
        },
        playerId: {
            type: "ref",
            ref: "user"
        },
        disablesAt: {
            type: "datetime"
        },
        env: {
            notNull: true,
            type: "object"
        },
        refreshedAt: {
            notNull: true,
            type: "datetime"
        },
        value: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        ableState: {
            type: "enum",
            enumeration: ["enabled", "disabled"]
        }
    },
    actionType: "crud",
    actions,
    indexes: [
        {
            name: 'index_value',
            attributes: [
                {
                    name: 'value',
                },
                {
                    name: '$$deleteAt$$',
                },
            ],
            config: {
                unique: true,
            },
        }
    ]
};