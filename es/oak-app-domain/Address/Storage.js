import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        detail: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        areaId: {
            notNull: true,
            type: "ref",
            ref: "area"
        },
        phone: {
            notNull: true,
            type: "varchar",
            params: {
                length: 12
            }
        },
        name: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        default: {
            notNull: true,
            type: "boolean"
        },
        remark: {
            type: "text"
        },
        entity: {
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["user"]
        },
        entityId: {
            type: "varchar",
            params: {
                length: 64
            }
        }
    },
    actionType: "crud",
    actions
};
