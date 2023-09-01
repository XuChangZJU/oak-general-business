import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { excludeUpdateActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        userId: {
            notNull: true,
            type: "ref",
            ref: "user"
        },
        roleId: {
            notNull: true,
            type: "ref",
            ref: "role"
        },
        relation: {
            notNull: true,
            type: "enum",
            enumeration: ["owner"]
        }
    },
    actionType: "excludeUpdate",
    actions
};