import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        menuId: {
            type: "int",
            params: {
                width: 4,
                signed: true
            }
        },
        menuConfig: {
            notNull: true,
            type: "object"
        },
        applicationId: {
            notNull: true,
            type: "ref",
            ref: "application"
        },
        publishState: {
            notNull: true,
            type: "enum",
            enumeration: ["wait", "success", "fail"]
        },
        wechatPublicTagId: {
            type: "ref",
            ref: "wechatPublicTag"
        }
    },
    actionType: "crud",
    actions
};
