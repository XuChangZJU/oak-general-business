"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'wechatQrCode',
        checker: async ({ operation }, context) => {
            return 0;
        },
    },
];
exports.default = checkers;
