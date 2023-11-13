import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        destEntity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        value: {
            notNull: true,
            type: "varchar",
            params: {
                length: 256
            }
        },
        recursive: {
            notNull: true,
            type: "boolean"
        },
        sourceEntity: {
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
            name: 'index_source_dest_path',
            attributes: [
                {
                    name: 'sourceEntity'
                },
                {
                    name: 'value'
                },
                {
                    name: 'destEntity'
                },
            ],
            config: {
                unique: true
            }
        }
    ]
};
