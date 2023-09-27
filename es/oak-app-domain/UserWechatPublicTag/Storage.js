import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        wechatPublicTagId: {
            notNull: true,
            type: "ref",
            ref: "wechatPublicTag"
        },
        wechatUserId: {
            notNull: true,
            type: "ref",
            ref: "wechatUser"
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
