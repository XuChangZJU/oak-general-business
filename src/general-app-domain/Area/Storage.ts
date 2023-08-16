import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { readOnlyActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        name: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        level: {
            notNull: true,
            type: "enum",
            enumeration: ["province", "city", "district", "street", "country"]
        },
        depth: {
            notNull: true,
            type: "int",
            params: {
                width: 4
            }
        },
        parentId: {
            type: "ref",
            ref: "area"
        },
        code: {
            notNull: true,
            type: "varchar",
            params: {
                length: 12
            }
        },
        center: {
            notNull: true,
            type: "geometry"
        }
    },
    static: true,
    actionType: "readOnly",
    actions
};