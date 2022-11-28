"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systems = void 0;
var DEV_CONFIG_1 = require("./DEV-CONFIG");
exports.systems = [
    {
        id: DEV_CONFIG_1.DEV_SYSTEM_ID,
        name: '测试系统',
        description: '测试系统',
        config: {
            App: {},
        },
        platformId: DEV_CONFIG_1.DEV_PLATFORM_ID,
        super: true,
    },
];
