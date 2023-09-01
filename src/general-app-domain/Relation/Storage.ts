import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
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
        name: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        display: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        }
    },
    actionType: "crud",
    actions,
    indexes: [
        {
            name: 'index_entity_entityId_name',
            attributes: [
                {
                    name: 'entity'
                },
                {
                    name: 'entityId'
                },
                {
                    name: 'name'
                }
            ],
            config: {
                unique: true
            }
        }
    ]
};