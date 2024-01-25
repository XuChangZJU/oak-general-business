"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const Action_1 = require("./Action");
exports.desc = {
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
    actions: Action_1.actions,
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
