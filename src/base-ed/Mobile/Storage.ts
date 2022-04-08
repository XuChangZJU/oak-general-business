import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        mobile: {
            type: "varchar",
            params: {
                width: 16
            }
        },
        userId: {
            type: "ref",
            ref: "user"
        }
    }
};