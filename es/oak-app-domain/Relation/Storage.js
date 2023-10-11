import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["session"]
        },
        entityId: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        name: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        display: {
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
            name: 'index_targetEntity_entityId_name',
            attributes: [
                {
                    name: 'entity',
                },
                {
                    name: 'entityId',
                },
                {
                    name: 'name',
                }
            ],
            config: {
                unique: true,
            },
        }
    ]
};
