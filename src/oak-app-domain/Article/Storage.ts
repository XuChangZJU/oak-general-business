import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        name: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        content: {
            notNull: true,
            type: "text"
        },
        articleMenuId: {
            notNull: true,
            type: "ref",
            ref: "articleMenu"
        }
    },
    actionType: "crud",
    actions
};