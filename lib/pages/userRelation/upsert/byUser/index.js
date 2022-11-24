"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    isList: false,
    formData: function () {
        var legal = this.tryExecute();
        return {
            legal: !!legal,
        };
    },
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
    },
    methods: {
        onConfirm: function () {
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
