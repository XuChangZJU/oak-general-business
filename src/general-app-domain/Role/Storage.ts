import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { readOnlyActions as actions, relationActions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        name: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        }
    },
    static: true,
    actionType: "readOnly",
    actions: actions.concat(relationActions),
    relation: ['owner']
};