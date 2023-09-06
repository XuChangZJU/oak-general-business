import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        userId: {
            notNull: true,
            type: "ref",
            ref: "user"
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
