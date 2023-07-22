import { CreateOperationData as ActionAuth } from '../general-app-domain/ActionAuth/Schema';

export const actionAuth: ActionAuth[] = [
    {
        id: 'message-user',
        path: 'user',
        destEntity: 'message',
        deActions: ['select', 'remove'],
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