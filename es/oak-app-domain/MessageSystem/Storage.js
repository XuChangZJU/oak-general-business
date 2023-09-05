import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        messageId: {
            notNull: true,
            type: "ref",
            ref: "message"
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
