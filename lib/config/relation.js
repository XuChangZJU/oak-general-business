"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectFreeEntities = exports.DeducedRelationMap = exports.IgnoredRelationPathMap = exports.IgnoredForeignKeyMap = void 0;
// 此对象所标识的外键关系不参与relation的路径判定，以减少relation的路径数量
exports.IgnoredForeignKeyMap = {
    //system: ['park'],
    messageSystem: ['message'],
    notification: ['messsageSystem'],
};
// 此对象所标识的路径不参与relation的路径判定，以减少relation的路径数量
exports.IgnoredRelationPathMap = {
    token: ['wechatUser.application'],
};
// 此对象所标识的entity的权限由其外键指向的父对象判定
exports.DeducedRelationMap = {
    extraFile: 'entity',
    message: 'entity',
    wechatQrCode: 'entity',
};
exports.SelectFreeEntities = [
    'application',
    'area',
    'mobile',
    'wechatQrCode',
    'messageTypeTemplateId',
    'token',
];
