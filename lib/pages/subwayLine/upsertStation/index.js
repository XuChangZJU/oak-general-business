"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'station',
    projection: {
        id: 1,
        name: 1,
    },
    isList: false,
    formData: function (_a) {
        var station = _a.data, features = _a.features;
        return {
            id: station === null || station === void 0 ? void 0 : station.id,
            name: station === null || station === void 0 ? void 0 : station.name,
        };
    },
    filters: [],
    properties: {
        openStation: false,
        onClose: function () { return undefined; },
        subwayId: '',
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
