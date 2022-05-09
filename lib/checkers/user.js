"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'user',
        checker: async ({ operation }) => {
            /* const { action, data } = operation;
            if (data instanceof Array) {
                data.forEach(
                    ele => {
                        checkAttributesNotNull(ele, ['nickname']);
                    }
                );
            }
            else {
                checkAttributesNotNull(data, ['nickname']);
            } */
            return 0;
        },
    }
];
exports.default = checkers;
