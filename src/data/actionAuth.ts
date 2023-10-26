import { CreateOperationData as ActionAuth } from '../oak-app-domain/ActionAuth/Schema';

const actionAuths: ActionAuth[] = [
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
        deActions: ['create', 'update', 'remove', 'select'],
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
];

export default actionAuths;