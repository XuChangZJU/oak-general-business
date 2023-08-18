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
        description: {
            notNull: true,
            type: "text"
        },
        type: {
            notNull: true,
            type: "enum",
            enumeration: ["web", "wechatMp", "wechatPublic"]
        },
        systemId: {
            notNull: true,
            type: "ref",
            ref: "system"
        },
        config: {
            notNull: true,
            type: "object"
        },
        style: {
            type: "object"
        }
    },
    actionType: "crud",
    actions
};