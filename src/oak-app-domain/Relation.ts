import { AuthCascadePath, AuthDeduceRelationMap } from "oak-domain/lib/types/Entity";
import { EntityDict } from "./EntityDict";
import { CreateOperationData as Relation } from "./Relation/Schema";
export const ActionCascadePathGraph: AuthCascadePath<EntityDict>[] = [
    ["account", "", "account", true],
    ["account", "user", "account", false],
    ["address", "user", "address", false],
    ["changePasswordTemp", "user", "changePasswordTemp", false],
    ["email", "user", "email", false],
    ["extraFile", "user", "extraFile", false],
    ["extraFile", "sessionMessage.session", "session", true],
    ["extraFile", "sessionMessage.session.user", "session", false],
    ["extraFile", "sessionMessage.user", "sessionMessage", false],
    ["extraFile", "sessionMessage.wechatUser.user", "wechatUser", false],
    ["message", "user", "message", false],
    ["messageSystem", "message.user", "message", false],
    ["mobile", "user", "mobile", false],
    ["notification", "messageSystem.message.user", "message", false],
    ["parasite", "user", "parasite", false],
    ["readRemark", "user", "readRemark", false],
    ["readRemark", "session", "session", true],
    ["readRemark", "session.user", "session", false],
    ["session", "", "session", true],
    ["session", "user", "session", false],
    ["sessionMessage", "session", "session", true],
    ["sessionMessage", "session.user", "session", false],
    ["sessionMessage", "user", "sessionMessage", false],
    ["sessionMessage", "wechatUser.user", "wechatUser", false],
    ["token", "email.user", "email", false],
    ["token", "mobile.user", "mobile", false],
    ["token", "parasite.user", "parasite", false],
    ["token", "user", "token", false],
    ["token", "player", "token", false],
    ["token", "wechatUser.user", "wechatUser", false],
    ["userEntityGrant", "account", "account", true],
    ["userEntityGrant", "account.user", "account", false],
    ["userEntityGrant", "session", "session", true],
    ["userEntityGrant", "session.user", "session", false],
    ["userEntityGrant", "granter", "userEntityGrant", false],
    ["userEntityGrant", "grantee", "userEntityGrant", false],
    ["userSystem", "user", "userSystem", false],
    ["userWechatPublicTag", "wechatUser.user", "wechatUser", false],
    ["wechatLogin", "user", "wechatLogin", false],
    ["wechatQrCode", "userEntityGrant.account", "account", true],
    ["wechatQrCode", "userEntityGrant.account.user", "account", false],
    ["wechatQrCode", "userEntityGrant.session", "session", true],
    ["wechatQrCode", "userEntityGrant.session.user", "session", false],
    ["wechatQrCode", "userEntityGrant.granter", "userEntityGrant", false],
    ["wechatQrCode", "userEntityGrant.grantee", "userEntityGrant", false],
    ["wechatQrCode", "wechatLogin.user", "wechatLogin", false],
    ["wechatQrCode", "user", "wechatQrCode", false],
    ["wechatUser", "user", "wechatUser", false]
];
export const RelationCascadePathGraph: AuthCascadePath<EntityDict>[] = [
    ["session", "user", "session", false],
    ["account", "user", "account", false],
    ["account", "", "account", true],
    ["session", "", "session", true]
];
export const relations: Relation[] = [
    {
        id: "account-owner",
        entity: "account",
        name: "owner"
    },
    {
        id: "account-audit",
        entity: "account",
        name: "audit"
    },
    {
        id: "session-partner",
        entity: "session",
        name: "partner"
    }
];
export const deducedRelationMap: AuthDeduceRelationMap<EntityDict> = {};
export const selectFreeEntities: (keyof EntityDict)[] = [];
export const updateFreeEntities: (keyof EntityDict)[] = [];
export const createFreeEntities: (keyof EntityDict)[] = [];