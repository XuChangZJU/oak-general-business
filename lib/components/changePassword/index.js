"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    isList: false,
    entity: 'user',
    projection: {
        id: 1,
        name: 1,
        nickname: 1,
    },
    formData: function (_a) {
        var user = _a.data, features = _a.features, props = _a.props;
        return {
            user: user,
        };
    },
    data: {
        channels: [],
    },
    lifetimes: {
        attached: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var userId, channels;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = this.props.oakId;
                            return [4 /*yield*/, this.features.cache.exec('getChangePasswordChannels', {
                                    userId: userId,
                                })];
                        case 1:
                            channels = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
    },
    methods: {},
});
