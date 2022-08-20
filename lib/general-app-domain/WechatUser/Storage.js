"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
exports.desc = {
    attributes: {
        origin: {
            type: "varchar",
            params: {
                length: 16
            }
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
        accessToken: {
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
    }
};
