import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        name: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        description: {
            notNull: true,
            type: "text"
        },
        config: {
            notNull: true,
            type: "object"
        },
        style: {
            type: "object"
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
        }
    },
    actionType: "crud",
    actions
};
