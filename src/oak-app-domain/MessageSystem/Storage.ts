import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
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