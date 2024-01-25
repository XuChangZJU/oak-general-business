import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { actions } from "./Action";
import { relationActions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        title: {
            notNull: true,
            type: "text"
        },
        description: {
            type: "text"
        },
        targetEntity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        targetFilter: {
            notNull: true,
            type: "object"
        },
        action: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        redirectTo: {
            notNull: true,
            type: "object"
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
        },
        iState: {
            type: "enum",
            enumeration: ["active", "done"]
        }
    },
    actionType: "crud",
    actions,
    relation: ["collaborator"]
};