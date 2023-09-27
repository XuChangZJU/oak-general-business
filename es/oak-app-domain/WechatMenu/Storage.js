import { actions } from "./Action";
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
        wechatPublicTagId: {
            type: "ref",
            ref: "wechatPublicTag"
        },
        iState: {
            type: "enum",
            enumeration: ["wait", "success", "fail"]
        }
    },
    actionType: "crud",
    actions
};
