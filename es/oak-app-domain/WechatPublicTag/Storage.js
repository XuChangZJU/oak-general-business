import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
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
            notNull: true,
            type: "int",
            params: {
                width: 4,
                signed: false
            }
        },
        sync: {
            notNull: true,
            type: "boolean"
        },
        syncAt: {
            notNull: true,
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
                    name: 'text',
                },
                {
                    name: "applicationId",
                },
            ],
            config: {
                unique: true,
            },
        }
    ]
};
