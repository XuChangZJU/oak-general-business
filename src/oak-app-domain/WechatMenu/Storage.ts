import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { actions } from "./Action";
export const desc: StorageDesc<OpSchema> = {
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