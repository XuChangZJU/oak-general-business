import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        userId: {
            notNull: true,
            type: "ref",
            ref: "user"
        },
        relationId: {
            notNull: true,
            type: "ref",
            ref: "relation"
        }
    },
    actionType: "crud",
    actions,
    indexes: [
        {
            name: 'index_user_relation',
            attributes: [
                {
                    name: "userId"
                },
                {
                    name: "relationId"
                },
            ],
            config: {
                unique: true
            }
        }
    ]
};