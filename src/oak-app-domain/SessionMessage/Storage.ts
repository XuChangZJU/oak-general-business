import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        applicationId: {
            notNull: true,
            type: "ref",
            ref: "application"
        },
        sessionId: {
            notNull: true,
            type: "ref",
            ref: "session"
        },
        userId: {
            type: "ref",
            ref: "user"
        },
        wechatUserId: {
            type: "ref",
            ref: "wechatUser"
        },
        createTime: {
            type: "datetime"
        },
        type: {
            notNull: true,
            type: "enum",
            enumeration: ["text", "image", "audio", "video", "news"]
        },
        text: {
            type: "text"
        },
        news: {
            type: "varchar",
            params: {
                length: 128
            }
        },
        aaoe: {
            type: "boolean"
        }
    },
    actionType: "crud",
    actions
};