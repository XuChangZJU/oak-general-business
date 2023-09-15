"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actionAuths = [
    {
        id: 'message-user',
        paths: ['user'],
        destEntity: 'message',
        deActions: ['select', 'remove', 'update'],
    },
    {
        id: 'mobile-user',
        paths: ['user'],
        destEntity: 'mobile',
        deActions: ['create', 'update', 'remove', 'select'],
    },
    {
        id: 'token-user',
        paths: ['user'],
        destEntity: 'token',
        deActions: ['create', 'update', 'remove', 'select'],
    },
    {
        id: 'wechatLogin-user',
        paths: ['user'],
        destEntity: 'wechatLogin',
        deActions: ['create', 'update', 'select'],
    },
    {
        id: 'wechatUser-user',
        paths: ['user'],
        destEntity: 'wechatUser',
        deActions: ['create', 'update', 'select'],
    },
    {
        id: 'passwordChangeTemp-user',
        paths: ['user'],
        destEntity: 'passwordChangeTemp',
        deActions: ['create', 'select'],
    },
];
exports.default = actionAuths;
