"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const triggers = [
    {
        entity: 'address',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context) => {
            const { action, data } = operation;
            return 0;
        },
        name: '建立新area前检查数据',
    }
];
