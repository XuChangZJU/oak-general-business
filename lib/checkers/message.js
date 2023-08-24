"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = require("oak-domain/lib/store/filter");
var checkers = [
    {
        type: 'logical',
        action: 'select',
        entity: 'message',
        checker: function (operation, context) {
            var systemId = context.getSystemId();
            if (!systemId) {
                return;
            }
            var isRoot = context.isRoot();
            if (isRoot) {
                return;
            }
            var filter = {
                messageSystem$message: {
                    systemId: systemId,
                }
            };
            operation.filter = operation.filter ? (0, filter_1.combineFilters)('message', context.getSchema(), [operation.filter, filter]) : filter;
        },
    }
];
exports.default = checkers;
