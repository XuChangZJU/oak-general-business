import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
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
        description: {
            type: "text"
        },
        config: {
            type: "object"
        },
        offset: {
            type: "int",
            params: {
                width: 4,
                signed: true
            }
        }
    },
    actionType: "crud",
    actions,
    indexes: [
        //索引
        {
            name: 'index_name',
            attributes: [
                {
                    name: 'name',
                },
            ],
        },
        {
            name: 'index_entity',
            attributes: [
                {
                    name: 'entity',
                },
                {
                    name: 'entityId',
                }
            ],
        }
    ]
};
