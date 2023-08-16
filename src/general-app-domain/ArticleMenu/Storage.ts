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
        isArticle: {
            notNull: true,
            type: "boolean"
        },
        parentId: {
            type: "ref",
            ref: "articleMenu"
        },
        isLeaf: {
            notNull: true,
            type: "boolean"
        },
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        entityId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        }
    },
    actionType: "crud",
    actions
};