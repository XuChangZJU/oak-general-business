import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        relationId: {
            type: "ref",
            ref: "relation"
        },
        path: {
            notNull: true,
            type: "varchar",
            params: {
                length: 256
            }
        },
        destEntity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        deActions: {
            notNull: true,
            type: "object"
        }
    },
    actionType: "crud",
    actions,
    indexes: [
        {
            name: 'index_entity_relation_path',
            attributes: [
                {
                    name: 'destEntity'
                },
                {
                    name: "relationId"
                },
                {
                    name: 'path'
                },
            ],
            config: {
                unique: true
            }
        }
    ]
};