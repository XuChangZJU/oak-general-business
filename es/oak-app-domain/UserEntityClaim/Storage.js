import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        uegId: {
            notNull: true,
            type: "ref",
            ref: "userEntityGrant"
        },
        userId: {
            notNull: true,
            type: "ref",
            ref: "user"
        },
        relationId: {
            notNull: true,
            type: "ref",
            ref: "relation"
        },
        claimEntityId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        userRelationId: {
            notNull: true,
            type: "ref",
            ref: "userRelation"
        }
    },
    actionType: "crud",
    actions
};
