import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { actions } from "./Action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        channel: {
            notNull: true,
            type: "enum",
            enumeration: ["wechatPublic", "jPush", "jim", "wechatMp", "sms"]
        },
        applicationId: {
            type: "ref",
            ref: "application"
        },
        data: {
            type: "object"
        },
        messageSystemId: {
            notNull: true,
            type: "ref",
            ref: "messageSystem"
        },
        data1: {
            type: "object"
        },
        data2: {
            type: "object"
        },
        templateId: {
            type: "varchar",
            params: {
                length: 128
            }
        },
        iState: {
            type: "enum",
            enumeration: ["sending", "success", "failure"]
        }
    },
    actionType: "crud",
    actions
};