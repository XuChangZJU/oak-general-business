import { actions } from "./Action";
export const desc = {
    attributes: {
        title: {
            notNull: true,
            type: "text"
        },
        description: {
            type: "text"
        },
        targetEntity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        targetEntityId: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        condition: {
            type: "object"
        },
        action: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        redirectTo: {
            notNull: true,
            type: "object"
        },
        iState: {
            type: "enum",
            enumeration: ["active", "done"]
        }
    },
    actionType: "crud",
    actions,
    relation: ['collaborator']
};
