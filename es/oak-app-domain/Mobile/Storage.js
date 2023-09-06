import { actions } from "./Action";
export const desc = {
    attributes: {
        mobile: {
            notNull: true,
            type: "varchar",
            params: {
                length: 16
            }
        },
        userId: {
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
            name: 'index_mobile_ableState',
            attributes: [
                {
                    name: 'mobile',
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
