"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = require("oak-domain/lib/store/filter");
var checkers = [
    {
        type: 'logical',
        action: 'select',
        entity: 'messageTypeTemplateId',
        checker: function (operation, context) {
            var applicationId = context.getApplicationId();
            var filter = {
                applicationId: applicationId,
            };
            operation.filter = operation.filter ? (0, filter_1.combineFilters)([operation.filter, filter]) : filter;
        },
    }
];
exports.default = checkers;
