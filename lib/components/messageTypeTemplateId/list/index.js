"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    entity: 'messageTypeTemplateId',
    isList: true,
    projection: {
        id: 1,
        applicationId: 1,
        templateId: 1,
        type: 1,
    },
    properties: {
        applicationId: String,
    },
    formData: function (_a) {
        var data = _a.data;
        var operations = this.getOperations();
        var dirtyIds = operations ? operations.map(function (ele) { var _a, _b; return ((_a = ele.operation.data) === null || _a === void 0 ? void 0 : _a.id) || ((_b = ele.operation.filter) === null || _b === void 0 ? void 0 : _b.id); }).filter(function (ele) { return !!ele; }) : [];
        var selectedTypes = data ? data.map(function (ele) { return ele.type; }) : [];
        var messageTypes = this.features.cache.get('messageType', {
            data: {
                id: 1,
                type: 1,
            }
        }).map(function (ele) { return ele.type; }).filter(function (ele) { return !selectedTypes.includes(ele); });
        return {
            mttIds: data,
            dirtyIds: dirtyIds,
            messageTypes: messageTypes,
        };
    },
    filters: [
        {
            filter: function () {
                var applicationId = this.props.applicationId;
                if (applicationId) {
                    return {
                        applicationId: applicationId,
                    };
                }
                return {};
            }
        }
    ],
    lifetimes: {
        ready: function () {
            this.features.cache.refresh('messageType', {
                data: {
                    id: 1,
                    type: 1,
                }
            });
        }
    }
});
