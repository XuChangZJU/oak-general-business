"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actionAuths = [
    {
        id: 'message-user',
        pathId: 'msg-user',
        deActions: ['select', 'remove', 'update'],
    },
    {
        id: 'mobile-user',
        pathId: 'mobile-user',
        deActions: ['create', 'update', 'remove', 'select'],
    },
    {
        id: 'token-user',
        pathId: 'token-user',
        deActions: ['create', 'update', 'remove', 'select', 'disable'],
    },
    {
        id: 'wechatLogin-user',
        pathId: 'wchL-user',
        deActions: ['create', 'update', 'select'],
    },
    {
        id: 'wechatUser-user',
        pathId: 'wchU-user',
        deActions: ['create', 'update', 'select'],
    },
    {
        id: 'passwordChangeTemp-user',
        pathId: 'pwdCT-user',
        deActions: ['create', 'select'],
    },
    {
        id: 'userEntityClaim-user',
        pathId: 'uec-user',
        deActions: ['create', 'select'],
    },
];
exports.default = actionAuths;
