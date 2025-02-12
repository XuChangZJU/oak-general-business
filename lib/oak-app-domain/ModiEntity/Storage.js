"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = void 0;
const action_1 = require("oak-domain/lib/actions/action");
exports.desc = {
    attributes: {
        modiId: {
            notNull: true,
            type: "ref",
            ref: "modi"
        },
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["user", "userEntityGrant", "userSystem", "userWechatPublicTag", "wechatLogin", "wechatMenu", "wechatMpJump", "wechatPublicAutoReply", "wechatPublicTag", "wechatQrCode", "wechatTemplate", "wechatUser"]
        },
        entityId: {
            notNull: true,
            type: "varchar",
            params: {
                length: 64
            }
        }
    },
    actionType: "appendOnly",
    actions: action_1.appendOnlyActions
};
