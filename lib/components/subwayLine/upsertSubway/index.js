"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'subway',
    projection: {
        id: 1,
        name: 1,
    },
    isList: false,
    formData: function (_a) {
        var subway = _a.data, features = _a.features;
        return {
            id: subway === null || subway === void 0 ? void 0 : subway.id,
            name: subway === null || subway === void 0 ? void 0 : subway.name,
        };
    },
    filters: [],
    properties: {
        openSubway: false,
        onClose: function () { return undefined; },
    },
    data: {},
    lifetimes: {
        ready: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            }); });
        },
    },
    methods: {},
});
