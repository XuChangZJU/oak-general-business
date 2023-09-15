"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("oak-domain/lib/store/filter");
const checkers = [
    {
        type: 'logical',
        action: 'select',
        entity: 'message',
        checker: (operation, context) => {
            const systemId = context.getSystemId();
            if (!systemId) {
                return;
            }
            const isRoot = context.isRoot();
            if (isRoot) {
                return;
            }
            const filter = {
                messageSystem$message: {
                    systemId,
                }
            };
            operation.filter = operation.filter ? (0, filter_1.combineFilters)('message', context.getSchema(), [operation.filter, filter]) : filter;
        },
    }
];
exports.default = checkers;
