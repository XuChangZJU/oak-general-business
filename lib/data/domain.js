"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domains = void 0;
var DEV_CONFIG_1 = require("./DEV-CONFIG");
exports.domains = [
    {
        id: DEV_CONFIG_1.DEV_DOMAIN_ID,
        protocol: 'http',
        url: 'localhost',
        port: 3001,
        apiPath: '/rest/aspect',
        systemId: DEV_CONFIG_1.DEV_SYSTEM_ID,
    },
];
