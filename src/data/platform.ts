import { CreateOperationData as Platform } from '../general-app-domain/Platform/Schema';
import { DEV_PLATFORM_ID } from './DEV-CONFIG';
export const platforms: Platform[] = [
    {
        id: DEV_PLATFORM_ID,
        name: '测试平台',
        description: '测试平台',
        config: {
            App: {},
        },
    }
]