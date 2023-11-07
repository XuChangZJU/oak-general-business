import { appendOnlyActions as actions } from "oak-domain/lib/actions/action";
export const desc = {
    attributes: {
        operId: {
            notNull: true,
            type: "ref",
            ref: "oper"
        },
        entity: {
            notNull: true,
            type: "varchar",
            params: {
                length: 32
            },
            ref: ["user", "userEntityGrant", "userSystem", "userWechatPublicTag", "wechatLogin", "wechatMenu", "wechatPublicAutoReply", "wechatPublicTag", "wechatPublicTemplate", "wechatQrCode", "wechatUser"]
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
    actions
};
