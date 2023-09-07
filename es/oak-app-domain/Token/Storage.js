import { actions } from "./Action";
export const desc = {
    attributes: {
        applicationId: {
            type: "ref",
            ref: "application"
        },
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["email", "mobile", "parasite", "wechatUser"]
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
        playerId: {
            type: "ref",
            ref: "user"
        },
        disablesAt: {
            type: "datetime"
        },
        env: {
            notNull: true,
            type: "object"
        },
        ableState: {
            type: "enum",
            enumeration: ["enabled", "disabled"]
        }
    },
    actionType: "crud",
    actions
};
