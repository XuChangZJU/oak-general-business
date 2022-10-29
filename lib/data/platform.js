"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.platforms = void 0;
var DEV_CONFIG_1 = require("./DEV-CONFIG");
exports.platforms = [
    {
        id: DEV_CONFIG_1.DEV_PLATFORM_ID,
        name: '测试平台',
        description: '测试平台',
        config: {
            App: {},
        },
    }
];
