import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
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