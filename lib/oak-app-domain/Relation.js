"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFreeEntities = exports.updateFreeEntities = exports.selectFreeEntities = exports.deducedRelationMap = exports.relations = exports.RelationCascadePathGraph = exports.ActionCascadePathGraph = void 0;
exports.ActionCascadePathGraph = [
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
    ["userEntityGrant", "session", "session", true],
    ["userEntityGrant", "session.user", "session", false],
    ["userEntityGrant", "granter", "userEntityGrant", false],
    ["userEntityGrant", "grantee", "userEntityGrant", false],
    ["userSystem", "user", "userSystem", false],
    ["userWechatPublicTag", "wechatUser.user", "wechatUser", false],
    ["wechatLogin", "user", "wechatLogin", false],
    ["wechatQrCode", "userEntityGrant.session", "session", true],
    ["wechatQrCode", "userEntityGrant.session.user", "session", false],
    ["wechatQrCode", "userEntityGrant.granter", "userEntityGrant", false],
    ["wechatQrCode", "userEntityGrant.grantee", "userEntityGrant", false],
    ["wechatQrCode", "wechatLogin.user", "wechatLogin", false],
    ["wechatQrCode", "user", "wechatQrCode", false],
    ["wechatUser", "user", "wechatUser", false]
];
exports.RelationCascadePathGraph = [
    ["session", "user", "session", false],
    ["session", "", "session", true]
];
exports.relations = [
    {
        id: "session-partner",
        entity: "session",
        name: "partner"
    }
];
exports.deducedRelationMap = {};
exports.selectFreeEntities = [];
exports.updateFreeEntities = [];
exports.createFreeEntities = [];
