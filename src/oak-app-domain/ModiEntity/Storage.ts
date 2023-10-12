import { StorageDesc } from "oak-domain/lib/types/Storage";
import { OpSchema } from "./Schema";
import { appendOnlyActions as actions } from "oak-domain/lib/actions/action";
export const desc: StorageDesc<OpSchema> = {
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
            ref: ["user", "userEntityGrant", "userSystem", "userWechatPublicTag", "wechatLogin", "wechatMenu", "wechatPublicTag", "wechatPublicTemplate", "wechatQrCode", "wechatUser", "wechatPublicAutoReply"]
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