import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        type: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        display: {
            type: "varchar",
            params: {
                length: 64
            }
        }
    },
    actionType: "crud",
    actions
};
