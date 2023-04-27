"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'service',
    projection: {
        id: 1,
        areaId: 1,
        name: 1,
        parentId: 1,
        parent: {
            id: 1,
            areaId: 1,
            name: 1,
            regToYearValue: 1,
            regToYearUnit: 1,
            type: 1,
        },
        regToYearValue: 1,
        regToYearUnit: 1,
        type: 1,
        show: 1,
        description: 1,
        extraFile$entity: {
            $entity: 'extraFile',
            data: {
                id: 1,
                tag1: 1,
                origin: 1,
                bucket: 1,
                objectId: 1,
                filename: 1,
                extra1: 1,
                extension: 1,
                type: 1,
                entity: 1,
            },
            filter: {
                tag1: 'icon',
            },
        },
    },
    isList: false,
    formData: function (_a) {
        var _b;
        var service = _a.data;
        return {
            name: service === null || service === void 0 ? void 0 : service.name,
            areaId: service === null || service === void 0 ? void 0 : service.areaId,
            parentId: service === null || service === void 0 ? void 0 : service.parentId,
            regToYearValue: service === null || service === void 0 ? void 0 : service.regToYearValue,
            regToYearUnit: service === null || service === void 0 ? void 0 : service.regToYearUnit,
            type: service === null || service === void 0 ? void 0 : service.type,
            parentName: (_b = service === null || service === void 0 ? void 0 : service.parent) === null || _b === void 0 ? void 0 : _b.name,
            description: service === null || service === void 0 ? void 0 : service.description,
            show: service === null || service === void 0 ? void 0 : service.show,
        };
    },
    data: {
        typeArr: [
            {
                label: '创业服务',
                value: 'entrepreneurial',
            },
            {
                label: '产业服务',
                value: 'industry',
            },
            {
                label: '招商服务',
                value: 'attractInvestment',
            },
            {
                label: '其他',
                value: 'other',
            },
        ],
    },
    lifetimes: {
        ready: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, parentId, oakId, _b, service;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.props, parentId = _a.parentId, oakId = _a.oakId;
                            if (!!oakId) return [3 /*break*/, 3];
                            if (!parentId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.features.cache.refresh('service', {
                                    data: {
                                        id: 1,
                                        type: 1,
                                        show: 1,
                                    },
                                    filter: {
                                        id: parentId,
                                    },
                                })];
                        case 1:
                            _b = tslib_1.__read.apply(void 0, [(_c.sent()).data, 1]), service = _b[0];
                            if (service) {
                                this.update({
                                    parentId: parentId,
                                    type: service.type,
                                    show: service.show,
                                });
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            this.update({
                                type: 'entrepreneurial',
                                show: 'shop',
                            });
                            _c.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
    },
    methods: {
        confirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.state.type) {
                                this.setMessage({
                                    type: 'error',
                                    content: '请选择类型',
                                });
                                return [2 /*return*/];
                            }
                            if (!this.state.name) {
                                this.setMessage({
                                    type: 'error',
                                    content: '请输入服务名称',
                                });
                                return [2 /*return*/];
                            }
                            if (!this.state.show) {
                                this.setMessage({
                                    type: 'error',
                                    content: '请选择展示形式',
                                });
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            this.navigateBack();
                            return [2 /*return*/];
                    }
                });
            });
        },
        reset: function () {
            this.clean();
        },
    },
});
