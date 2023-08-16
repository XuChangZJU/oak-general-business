import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        type: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        templateId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 128
            }
        },
        applicationId: {
            notNull: true,
            type: "ref",
            ref: "application"
        }
    },
    actionType: "crud",
    actions
};