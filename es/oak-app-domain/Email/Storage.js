import { actions } from "./Action";
export const desc = {
    attributes: {
        email: {
            notNull: true,
            type: "varchar",
            params: {
                length: 16
            }
        },
        userId: {
            notNull: true,
            type: "ref",
            ref: "user"
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
            name: 'index_email_ableState',
            attributes: [
                {
                    name: 'email',
                    direction: 'ASC'
                },
                {
                    name: 'ableState',
                    direction: 'ASC'
                }
            ]
        }
    ]
};
