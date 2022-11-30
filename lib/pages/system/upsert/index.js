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
        description: 1,
        folder: 1,
        super: 1,
        style: 1,
    },
    formData: function (_a) {
        var data = _a.data;
        return data || {};
    },
    lifetimes: {
        ready: function () {
            var _a = this.props, platformId = _a.platformId, oakId = _a.oakId;
            if (!oakId) {
                if (platformId) {
                    this.update({ platformId: platformId });
                }
            }
        },
    },
    methods: {
        confirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            this.navigateBack();
                            return [2 /*return*/];
                    }
                });
            });
        }
    },
});
