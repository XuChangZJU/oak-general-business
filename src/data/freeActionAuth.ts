import { EntityDict } from '../general-app-domain';

const freeActionAuths: EntityDict['freeActionAuth']['CreateSingle']['data'][] = [
    {
        id: 'application',
        destEntity: 'application',
        deActions: ['select'],
    },
    {
        id: 'userEntityGrant',
        destEntity: 'userEntityGrant',
        deActions: ['confirm', 'select'],
    },
    {
        id: 'user',
        destEntity: 'user',
        deActions: ['select'],
    }
];

export default freeActionAuths;
