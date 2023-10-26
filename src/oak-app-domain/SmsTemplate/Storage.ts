import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        systemId: {
            notNull: true,
            type: "ref",
            ref: "system"
        },
        origin: {
            notNull: true,
            type: "enum",
            enumeration: ["ali", "tencent"]
        },
        templateName: {
            notNull: true,
            type: "text"
        },
        templateCode: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        templateContent: {
            notNull: true,
            type: "text"
        },
        syncAt: {
            notNull: true,
            type: "datetime"
        }
    },
    actionType: "crud",
    actions
};