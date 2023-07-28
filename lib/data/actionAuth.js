"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionAuth = void 0;
exports.actionAuth = [
    {
        id: 'message-user',
        path: 'user',
        destEntity: 'message',
        deActions: ['select', 'remove', 'update'],
    },
    {
        id: 'mobile-user',
        path: 'user',
        destEntity: 'mobile',
        deActions: ['create', 'update', 'remove', 'select'],
    },
    {
        id: 'token-user',
        path: 'user',
        destEntity: 'token',
        deActions: ['create', 'update', 'remove', 'select'],
    },
    {
        id: 'wechatLogin-user',
        path: 'user',
        destEntity: 'wechatLogin',
        deActions: ['create', 'update', 'select'],
    },
    {
        id: 'wechatUser-user',
        path: 'user',
        destEntity: 'wechatUser',
        deActions: ['create', 'update', 'select'],
    }
];
