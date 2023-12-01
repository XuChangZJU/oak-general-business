import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { actions } from "./Action";
import { relationActions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        total: {
            notNull: true,
            type: "money"
        },
        avail: {
            notNull: true,
            type: "money"
        },
        entity: {
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["user"]
        },
        entityId: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        ableState: {
            type: "enum",
            enumeration: ["enabled", "disabled"]
        }
    },
    actionType: "crud",
    actions,
    relation: ["owner", "audit"]
};