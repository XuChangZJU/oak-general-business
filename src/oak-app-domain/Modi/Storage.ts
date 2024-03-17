import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { actions } from "./Action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        targetEntity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
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
        action: {
            notNull: true,
            type: "varchar",
            params: {
                length: 24
            }
        },
        data: {
            notNull: true,
            type: "object"
        },
        filter: {
            type: "object"
        },
        extra: {
            type: "object"
        },
        iState: {
            type: "enum",
            enumeration: ["active", "applied", "abandoned"]
        }
    },
    actionType: "crud",
    actions,
    indexes: [
        {
            name: 'index_state',
            attributes: [
                {
                    name: 'iState',
                    direction: 'ASC',
                }
            ],
        }
    ]
};