import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        name: {
            type: "varchar",
            params: {
                width: 32
            }
        },
        level: {
            type: "varchar",
            params: {
                length: 16
            }
        },
        depth: {
            type: "int",
            params: {
                precision: 8,
                scale: 2
            }
        },
        parentId: {
            type: "ref",
            ref: "area"
        },
        code: {
            type: "varchar",
            params: {
                width: 12
            }
        },
        center: {
            type: "geometry"
        }
    }
};