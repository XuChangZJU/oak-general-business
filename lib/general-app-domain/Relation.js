"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectFreeEntities = exports.deducedRelationMap = exports.relations = exports.RelationCascadePathGraph = exports.ActionCascadePathGraph = void 0;
exports.ActionCascadePathGraph = [
    ["email", "user", "email", false],
    ["extraFile", "user", "extraFile", false],
    ["message", "user", "message", false],
    ["messageSystem", "message.user", "message", false],
    ["mobile", "user", "mobile", false],
    ["notification", "messageSystem.message.user", "message", false],
    ["token", "email.user", "email", false],
    ["token", "mobile.user", "mobile", false],
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
exports.RelationCascadePathGraph = [];
exports.relations = [];
exports.deducedRelationMap = {};
exports.selectFreeEntities = [];
