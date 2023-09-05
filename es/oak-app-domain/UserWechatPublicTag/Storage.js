import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        wechatPublicTagId: {
            notNull: true,
            type: "ref",
            ref: "wechatPublicTag"
        },
        userId: {
            notNull: true,
            type: "ref",
            ref: "user"
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
    actions
};
