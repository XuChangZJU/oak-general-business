import { actions } from "./Action";
export const desc = {
    attributes: {
        total: {
            notNull: true,
            type: "money"
        },
        avail: {
            notNull: true,
            type: "money"
        },
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
        ableState: {
            type: "enum",
            enumeration: ["enabled", "disabled"]
        }
    },
    actionType: "crud",
    actions,
    relation: ["owner", "audit"]
};
