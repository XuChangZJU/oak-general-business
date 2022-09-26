"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applications = void 0;
var DEV_CONFIG_1 = require("./DEV-CONFIG");
exports.applications = [
    {
        id: DEV_CONFIG_1.DEV_WECHATMP_APPLICATION_ID,
        name: '测试小程序',
        type: 'wechatMp',
        systemId: DEV_CONFIG_1.DEV_SYSTEM_ID,
        config: {
            type: 'wechatMp',
            appId: '',
            appSecret: '',
        },
        description: '小程序应用，指向dev_system',
    },
    {
        id: DEV_CONFIG_1.DEV_WEB_APPLICATION_ID,
        name: 'devWeb',
        type: 'web',
        systemId: DEV_CONFIG_1.DEV_SYSTEM_ID,
        config: {
            type: 'web',
        },
        description: 'web应用，指向dev_system',
    },
];
