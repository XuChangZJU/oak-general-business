"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const watchers = [
    {
        name: '使定期禁用的token被禁用',
        entity: 'token',
        filter() {
            const now = Date.now();
            return {
                disablesAt: {
                    $lt: now,
                },
                ableState: 'enabled',
            };
        },
        action: 'disable',
        actionData: {},
    },
];
exports.default = watchers;
