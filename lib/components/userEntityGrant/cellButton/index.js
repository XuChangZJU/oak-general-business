"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'userEntityGrant',
    isList: false,
    formData: function (_a) {
        var data = _a.data;
        return {};
    },
    actions: ['disable'],
    methods: {
        tapAction: function (action) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var id, _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            id = this.props.oakId;
                            _a = action;
                            switch (_a) {
                                case 'disable': return [3 /*break*/, 1];
                            }
                            return [3 /*break*/, 3];
                        case 1:
                            this.update({
                                expired: true,
                            }, 'disable');
                            return [4 /*yield*/, this.execute()];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            {
                                return [3 /*break*/, 4];
                            }
                            _b.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
    },
});
