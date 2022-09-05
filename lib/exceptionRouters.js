"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
var Exception_1 = require("oak-domain/lib/types/Exception");
exports.routers = [
    [
        Exception_1.OakUnloggedInException, {
            router: '/login',
            disableNamespace: true,
        }
    ]
];
