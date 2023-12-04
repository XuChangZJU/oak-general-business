import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        module: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        position: {
            notNull: true,
            type: "varchar",
            params: {
                length: 188
            }
        },
        namespace: {
            notNull: true,
            type: "varchar",
            params: {
                length: 256
            }
        },
        language: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        data: {
            notNull: true,
            type: "object"
        }
    },
    static: true,
    actionType: "crud",
    actions,
    indexes: [
        {
            name: 'namespace_language',
            attributes: [
                {
                    name: 'namespace',
                },
                {
                    name: 'language',
                }
            ],
            config: {
                unique: true,
            },
        }
    ]
};