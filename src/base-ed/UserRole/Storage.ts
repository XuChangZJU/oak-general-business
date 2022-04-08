import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        userId: {
            type: "ref",
            ref: "user"
        },
        roleId: {
            type: "ref",
            ref: "role"
        },
        relation: {
            type: "varchar",
            params: {
                length: 16
            }
        }
    }
};