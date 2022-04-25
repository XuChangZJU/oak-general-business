"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
const Exceptions_1 = require("./types/Exceptions");
exports.routers = [
    [Exceptions_1.OakUnloggedInException, {
            router: '/token/login',
        }]
];
