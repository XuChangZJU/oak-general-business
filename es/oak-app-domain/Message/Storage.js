import { actions } from "./Action";
export const desc = {
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
        userId: {
            notNull: true,
            type: "ref",
            ref: "user"
        },
        type: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        weight: {
            notNull: true,
            type: "enum",
            enumeration: ["high", "medium", "low"]
        },
        restriction: {
            type: "object"
        },
        title: {
            notNull: true,
            type: "varchar",
            params: {
                length: 256
            }
        },
        content: {
            notNull: true,
            type: "text"
        },
        data: {
            type: "object"
        },
        router: {
            type: "object"
        },
        iState: {
            type: "enum",
            enumeration: ["sending", "success", "failure"]
        },
        visitState: {
            type: "enum",
            enumeration: ["unvisited", "visited"]
        }
    },
    actionType: "crud",
    actions
};
