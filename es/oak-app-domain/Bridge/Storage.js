import { actions } from "./Action";
export const desc = {
    attributes: {
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            }
        },
        entityId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        },
        expiresAt: {
            notNull: true,
            type: "datetime"
        },
        expired: {
            notNull: true,
            type: "boolean"
        },
        redirectTo: {
            notNull: true,
            type: "object"
        },
        qrCodeType: {
            notNull: true,
            type: "enum",
            enumeration: ["wechatMpDomainUrl", "wechatMpWxaCode", "wechatPublic", "wechatPublicForMp", "webForWechatPublic"]
        }
    },
    actionType: "crud",
    actions
};
