import { AuthCascadePath, AuthDeduceRelationMap, SelectFreeEntities } from "oak-domain/lib/types/Entity";
import { EntityDict } from "./EntityDict";
import { CreateOperationData as Relation } from "./Relation/Schema";
export const ActionCascadePathGraph: AuthCascadePath<EntityDict>[] = [
    ["email", "user", "email", false],
    ["extraFile", "user", "extraFile", false],
    ["message", "user", "message", false],
    ["messageSystem", "message.user", "message", false],
    ["mobile", "user", "mobile", false],
    ["notification", "messageSystem.message.user", "message", false],
    ["parasite", "user", "parasite", false],
    ["token", "email.user", "email", false],
    ["token", "mobile.user", "mobile", false],
    ["token", "parasite.user", "parasite", false],
    ["token", "user", "token", false],
    ["token", "player", "token", false],
    ["token", "wechatUser.user", "wechatUser", false],
    ["userEntityGrant", "granter", "userEntityGrant", false],
    ["userEntityGrant", "grantee", "userEntityGrant", false],
    ["userSystem", "user", "userSystem", false],
    ["userWechatPublicTag", "user", "userWechatPublicTag", false],
    ["wechatLogin", "user", "wechatLogin", false],
    ["wechatQrCode", "userEntityGrant.granter", "userEntityGrant", false],
    ["wechatQrCode", "userEntityGrant.grantee", "userEntityGrant", false],
    ["wechatQrCode", "wechatLogin.user", "wechatLogin", false],
    ["wechatQrCode", "user", "wechatQrCode", false],
    ["wechatUser", "user", "wechatUser", false]
];
export const RelationCascadePathGraph: AuthCascadePath<EntityDict>[] = [];
export const relations: Relation[] = [];
export const deducedRelationMap: AuthDeduceRelationMap<EntityDict> = {};
export const selectFreeEntities: SelectFreeEntities<EntityDict> = [];