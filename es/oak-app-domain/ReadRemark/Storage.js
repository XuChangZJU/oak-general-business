import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        userId: {
            notNull: true,
            type: "ref",
            ref: "user"
        },
        sessionId: {
            notNull: true,
            type: "ref",
            ref: "session"
        }
    },
    actionType: "crud",
    actions
};
