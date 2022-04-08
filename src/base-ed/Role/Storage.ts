import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        name: {
            type: "varchar",
            params: {
                width: 64
            }
        }
    }
};