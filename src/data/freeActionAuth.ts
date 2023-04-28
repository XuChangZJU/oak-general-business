import { EntityDict } from '../general-app-domain';

const freeActionAuths: EntityDict['freeActionAuth']['CreateSingle']['data'][] = [
    {
        id: 'application',
        destEntity: 'application',
        deActions: ['select'],
    },
];

export default freeActionAuths;
