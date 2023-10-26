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
        templateId: {
            notNull: true,
            type: "ref",
            ref: "smsTemplate"
        }
    },
    actionType: "crud",
    actions
};
