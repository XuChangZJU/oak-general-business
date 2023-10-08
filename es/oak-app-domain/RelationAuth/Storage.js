import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        sourceRelationId: {
            notNull: true,
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
        destRelationId: {
            notNull: true,
            type: "ref",
            ref: "relation"
        }
    },
    actionType: "crud",
    actions,
    indexes: [
        {
            name: 'index_entity_relation_path',
            attributes: [
                {
                    name: "sourceRelationId",
                },
                {
                    name: 'path',
                },
                {
                    name: "destRelationId",
                },
            ],
            config: {
                unique: true,
            },
        }
    ]
};
