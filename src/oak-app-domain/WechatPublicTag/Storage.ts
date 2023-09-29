import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { actions } from "./Action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        text: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        applicationId: {
            notNull: true,
            type: "ref",
            ref: "application"
        },
        wechatId: {
            type: "int",
            params: {
                width: 4,
                signed: false
            }
        },
        sync: {
            type: "boolean"
        },
        syncAt: {
            type: "datetime"
        }
    },
    actionType: "crud",
    actions,
    indexes: [
        {
            name: 'index_text_application',
            attributes: [
                {
                    name: 'text'
                },
                {
                    name: "applicationId"
                },
            ],
            config: {
                unique: true
            }
        }
    ]
};