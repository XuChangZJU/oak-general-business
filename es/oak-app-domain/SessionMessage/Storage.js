import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
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
            enumeration: ["text", "image", "voice", "video", "location", "link", "event", "miniprogrampage"]
        },
        text: {
            type: "text"
        },
        link: {
            type: "varchar",
            params: {
                length: 128
            }
        },
        aaoe: {
            type: "boolean"
        },
        extra: {
            type: "object"
        }
    },
    actionType: "crud",
    actions
};
