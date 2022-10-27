import { CreateOperationData as Application } from '../general-app-domain/Application/Schema';
import {
    DEV_SYSTEM_ID,
    DEV_WECHATMP_APPLICATION_ID,
    DEV_WEB_APPLICATION_ID,
} from './DEV-CONFIG';

export const applications: Application[] = [
    {
        id: DEV_WECHATMP_APPLICATION_ID,
        name: '测试小程序',
        type: 'wechatMp',
        systemId: DEV_SYSTEM_ID,
        config: {
            type: 'wechatMp',
            appId: '',
            appSecret: '',
        },
        description: '小程序应用，指向dev_system',
    },
    {
        id: DEV_WEB_APPLICATION_ID,
        name: 'devWeb',
        type: 'web',
        systemId: DEV_SYSTEM_ID,
        config: {
            type: 'web',
            passport: ['email', 'mobile', 'wechat'],
        },
        description: 'web应用，指向dev_system',
    },
];
