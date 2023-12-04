import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { genericActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        origin: {
            notNull: true,
            type: "enum",
            enumeration: ["mp", "public", "web", "native"]
        },
        openId: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        unionId: {
            type: "varchar",
            params: {
                length: 32
            }
        },
        sessionKey: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        accessToken: {
            type: "varchar",
            params: {
                length: 128
            }
        },
        refreshToken: {
            type: "varchar",
            params: {
                length: 128
            }
        },
        scope: {
            type: "varchar",
            params: {
                length: 64
            }
        },
        atExpiredAt: {
            type: "datetime"
        },
        rtExpiredAt: {
            type: "datetime"
        },
        subscribed: {
            type: "boolean"
        },
        subscribedAt: {
            type: "datetime"
        },
        unsubscribedAt: {
            type: "datetime"
        },
        userId: {
            type: "ref",
            ref: "user"
        },
        applicationId: {
            notNull: true,
            type: "ref",
            ref: "application"
        },
        nickname: {
            type: "varchar",
            params: {
                length: 128
            }
        },
        avatar: {
            type: "text"
        }
    },
    actionType: "crud",
    actions
};