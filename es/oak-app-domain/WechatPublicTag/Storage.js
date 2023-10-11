import { actions } from "./Action";
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
        },
        iState: {
            type: "enum",
            enumeration: ["wait", "success", "fail"]
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
