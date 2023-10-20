import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        url: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        apiPath: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        protocol: {
            notNull: true,
            type: "enum",
            enumeration: ["http", "https"]
        },
        port: {
            notNull: true,
            type: "int",
            params: {
                width: 2,
                signed: true
            }
        },
        systemId: {
            notNull: true,
            type: "ref",
            ref: "system"
        }
    },
    actionType: "crud",
    actions
};
