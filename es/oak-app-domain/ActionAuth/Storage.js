import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        relationId: {
            type: "ref",
            ref: "relation"
        },
        pathId: {
            notNull: true,
            type: "ref",
            ref: "path"
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
            name: 'index_relation_path',
            attributes: [
                {
                    name: "relationId"
                },
                {
                    name: "pathId"
                }
            ],
            config: {
                unique: true
            }
        }
    ]
};
