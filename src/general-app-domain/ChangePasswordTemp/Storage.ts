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
        prevPassword: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        newPassword: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        result: {
            notNull: true,
            type: "enum",
            enumeration: ["success", "fail"]
        }
    },
    actionType: "crud",
    actions
};