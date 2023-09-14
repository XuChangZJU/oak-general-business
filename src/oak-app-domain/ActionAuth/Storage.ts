import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        relationId: {
            type: "ref",
            ref: "relation"
        },
        paths: {
            notNull: true,
            type: "object"
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
            name: 'index_entity_relation',
            attributes: [
                {
                    name: 'destEntity',
                },
                {
                    name: "relationId",
                },
            ],
        }
    ]
};