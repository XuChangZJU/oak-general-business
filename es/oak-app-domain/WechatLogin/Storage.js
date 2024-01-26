import { actions } from "./Action";
export const desc = {
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
            enumeration: ["wechatPublic", "wechatMpDomainUrl", "wechatMpWxaCode", "wechatPublicForMp", "webForWechatPublic"]
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
                    name: 'expired',
                },
                {
                    name: 'expiresAt',
                },
            ],
        }
    ]
};
