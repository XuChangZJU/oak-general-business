"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relations = exports.RelationCascadePathGraph = exports.ActionCascadePathGraph = void 0;
exports.ActionCascadePathGraph = [
    ["userRelation", "user", "userRelation", false],
    ["email", "user", "email", false],
    ["token", "email.user", "email", false],
    ["message", "user", "message", false],
    ["messageSystem", "message.user", "message", false],
    ["notification", "messageSystem.message.user", "message", false],
    ["mobile", "user", "mobile", false],
    ["token", "mobile.user", "mobile", false],
    ["token", "user", "token", false],
    ["token", "player", "token", false],
    ["userSystem", "user", "userSystem", false],
    ["userWechatPublicTag", "user", "userWechatPublicTag", false],
    ["wechatUser", "user", "wechatUser", false],
    ["token", "wechatUser.user", "wechatUser", false],
    ["extraFile", "user", "extraFile", false],
    ["wechatQrCode", "user", "wechatQrCode", false],
    ["role", "", "role", true],
    ["relation", "role", "role", true],
    ["actionAuth", "relation.role", "role", true],
    ["relationAuth", "relation.role", "role", true],
    ["userRelation", "relation.role", "role", true],
    ["userRelation", "role", "role", true]
];
exports.RelationCascadePathGraph = [
    ["role", "", "role", true]
];
exports.relations = [
    {
        id: "role-owner",
        entity: "role",
        name: "owner"
    }
];
