"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    isList: false,
    entity: 'system',
    projection: {
        id: 1,
        name: 1,
        config: 1,
    },
    formData: function (_a) {
        var data = _a.data;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, data || {}];
            });
        });
    },
    methods: {},
});
