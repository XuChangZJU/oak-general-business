import { AuthCascadePath, AuthDeduceRelationMap } from "oak-domain/lib/types/Entity";
import { EntityDict } from "./EntityDict";
import { CreateOperationData as Relation } from "./Relation/Schema";
export const ActionCascadePathGraph: AuthCascadePath<EntityDict>[] = [
    ["changePasswordTemp", "user", "changePasswordTemp", false],
    ["email", "user", "email", false],
    ["extraFile", "user", "extraFile", false],
    ["extraFile", "sessionMessage.session", "session", true],
    ["extraFile", "sessionMessage.user", "sessionMessage", false],
    ["extraFile", "sessionMessage.wechatUser.user", "wechatUser", false],
    ["message", "user", "message", false],
    ["messageSystem", "message.user", "message", false],
    ["mobile", "user", "mobile", false],
    ["notification", "messageSystem.message.user", "message", false],
    ["parasite", "user", "parasite", false],
    ["session", "", "session", true],
    ["sessionMessage", "session", "session", true],
    ["sessionMessage", "user", "sessionMessage", false],
    ["sessionMessage", "wechatUser.user", "wechatUser", false],
    ["token", "email.user", "email", false],
    ["token", "mobile.user", "mobile", false],
    ["token", "parasite.user", "parasite", false],
    ["token", "user", "token", false],
    ["token", "player", "token", false],
    ["token", "wechatUser.user", "wechatUser", false],
    ["userEntityGrant", "session", "session", true],
    ["userEntityGrant", "granter", "userEntityGrant", false],
    ["userEntityGrant", "grantee", "userEntityGrant", false],
    ["userSystem", "user", "userSystem", false],
    ["userWechatPublicTag", "user", "userWechatPublicTag", false],
    ["wechatLogin", "user", "wechatLogin", false],
    ["wechatQrCode", "userEntityGrant.session", "session", true],
    ["wechatQrCode", "userEntityGrant.granter", "userEntityGrant", false],
    ["wechatQrCode", "userEntityGrant.grantee", "userEntityGrant", false],
    ["wechatQrCode", "wechatLogin.user", "wechatLogin", false],
    ["wechatQrCode", "user", "wechatQrCode", false],
    ["wechatUser", "user", "wechatUser", false]
];
export const RelationCascadePathGraph: AuthCascadePath<EntityDict>[] = [
    ["session", "", "session", true]
];
export const relations: Relation[] = [
    {
        id: "session-owner",
        entity: "session",
        name: "owner"
    }
];
export const deducedRelationMap: AuthDeduceRelationMap<EntityDict> = {};
export const selectFreeEntities: (keyof EntityDict)[] = [];
export const updateFreeEntities: (keyof EntityDict)[] = [];
export const createFreeEntities: (keyof EntityDict)[] = [];