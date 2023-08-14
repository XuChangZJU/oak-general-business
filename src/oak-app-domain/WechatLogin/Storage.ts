import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { actions } from "./Action";
export const desc: StorageDesc<OpSchema> = {
    attributes: {
        userId: {
            type: "ref",
            ref: "user"
        },
        type: {
            notNull: true,
            type: "enum",
            enumeration: ["bind", "login"]
        },
        successed: {
            notNull: true,
            type: "boolean"
        },
        remark: {
            type: "text"
        },
        qrCodeType: {
            notNull: true,
            type: "enum",
            enumeration: ["wechatMpDomainUrl", "wechatMpWxaCode", "wechatPublic", "wechatPublicForMp", "webForWechatPublic"]
        },
        expiresAt: {
            type: "datetime"
        },
        expired: {
            type: "boolean"
        }
    },
    actionType: "crud",
    actions,
    indexes: [
        {
            name: 'index_uuid',
            attributes: [
                {
                    name: 'expired'
                },
                {
                    name: 'expiresAt'
                },
            ]
        }
    ]
};