import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        content: {
            notNull: true,
            type: "object"
        },
        applicationId: {
            notNull: true,
            type: "ref",
            ref: "application"
        },
        type: {
            notNull: true,
            type: "enum",
            enumeration: ["text", "image", "video", "voice"]
        },
        event: {
            notNull: true,
            type: "enum",
            enumeration: ["subscribe", "unsubscribe", "keyword", "auto"]
        }
    },
    actionType: "crud",
    actions
};