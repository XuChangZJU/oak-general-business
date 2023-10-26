import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        sourceRelationId: {
            notNull: true,
            type: "ref",
            ref: "relation"
        },
        pathId: {
            notNull: true,
            type: "ref",
            ref: "path"
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
                    name: "pathId",
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
