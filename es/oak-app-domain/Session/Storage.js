import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["application"]
        },
        entityId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        userId: {
            type: "ref",
            ref: "user"
        },
        lmts: {
            type: "datetime"
        },
        openId: {
            type: "varchar",
            params: {
                length: 32
            }
        }
    },
    actionType: "crud",
    actions,
    relation: ['partner']
};
