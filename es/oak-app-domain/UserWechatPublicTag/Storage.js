import { actions } from "./Action";
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
        },
        iState: {
            type: "enum",
            enumeration: ["wait", "success", "fail"]
        }
    },
    actionType: "crud",
    actions
};
