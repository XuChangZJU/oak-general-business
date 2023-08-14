import { CreateOperationData as ActionAuth } from '../oak-app-domain/ActionAuth/Schema';

const actionAuths: ActionAuth[] = [
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
    }
];

export default actionAuths;