import { CreateOperationData as Domain } from '../general-app-domain/Domain/Schema';
import { DEV_SYSTEM_ID, DEV_DOMAIN_ID } from './DEV-CONFIG';

export const domains: Domain[] = [
    {
        id: DEV_DOMAIN_ID,
        protocol: 'http',
        url: 'localhost',
        port: 3001,
        apiPath: '/rest/aspect',
        systemId: DEV_SYSTEM_ID,
    },
];