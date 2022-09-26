import { CreateOperationData as System } from '../general-app-domain/System/Schema';
import { DEV_PLATFORM_ID, DEV_SYSTEM_ID } from './DEV-CONFIG';


export const systems: System[] = [
    {
        id: DEV_SYSTEM_ID,
        name: '',
        description: '',
        config: {},
        platformId: DEV_PLATFORM_ID,
        super: true,
    },
];
