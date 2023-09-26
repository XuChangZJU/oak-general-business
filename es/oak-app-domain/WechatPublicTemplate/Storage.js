import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        applicationId: {
            notNull: true,
            type: "ref",
            ref: "application"
        },
        wechatId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        title: {
            notNull: true,
            type: "text"
        },
        primaryIndustry: {
            notNull: true,
            type: "text"
        },
        deputyIndustry: {
            notNull: true,
            type: "text"
        },
        content: {
            notNull: true,
            type: "text"
        },
        example: {
            notNull: true,
            type: "text"
        },
        param: {
            notNull: true,
            type: "object"
        },
        syncAt: {
            notNull: true,
            type: "datetime"
        }
    },
    actionType: "crud",
    actions
};
