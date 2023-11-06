"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFreeDict = exports.selectFreeEntities = exports.authDeduceRelationMap = void 0;
// 此对象所标识的entity的权限由其外键指向的父对象判定
exports.authDeduceRelationMap = {
    extraFile: 'entity',
    message: 'entity',
    wechatQrCode: 'entity',
};
// 可以自由选择的对象
exports.selectFreeEntities = [
    'application',
    'domain',
    'area',
    'mobile',
    'wechatQrCode',
    'wechatLogin',
    'messageTypeTemplate',
    'articleMenu',
    'article',
    'userEntityGrant',
];
// 可以自由更新的对象
exports.updateFreeDict = {
    userEntityGrant: ['claim'],
};
