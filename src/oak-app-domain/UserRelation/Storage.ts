import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        userId: {
            notNull: true,
            type: "ref",
            ref: "user"
        },
        relationId: {
            notNull: true,
            type: "ref",
            ref: "relation"
        },
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["account", "session", "toDo"]
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
    actions,
    indexes: [
        {
            name: 'index_user_entity_entityId_relation',
            attributes: [
                {
                    name: "userId",
                },
                {
                    name: 'entity',
                },
                {
                    name: 'entityId',
                },
                {
                    name: "relationId",
                },
            ],
            config: {
                unique: true,
            },
        }
    ]
};