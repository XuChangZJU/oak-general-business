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
        areaId: {
            notNull: true,
            type: "ref",
            ref: "area"
        }
    },
    actionType: "crud",
    actions
};
