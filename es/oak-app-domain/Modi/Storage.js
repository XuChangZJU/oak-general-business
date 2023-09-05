import { actions } from "./Action";
export const desc = {
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
                length: 16
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
                    direction: 'ASC'
                }
            ]
        }
    ]
};
