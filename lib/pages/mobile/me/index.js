"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakPage({
    entity: 'mobile',
    isList: true,
    projection: {
        id: 1,
        mobile: 1,
        userId: 1,
    },
    filters: [{
            filter: function (_a) {
                var features = _a.features;
                return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    var tokenId;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, features.token.getToken()];
                            case 1:
                                tokenId = _b.sent();
                                return [2 /*return*/, {
                                        user: {
                                            id: {
                                                $in: {
                                                    entity: 'token',
                                                    data: {
                                                        userId: 1,
                                                    },
                                                    filter: {
                                                        id: tokenId,
                                                        ableState: 'enabled',
                                                    }
                                                }
                                            }
                                        },
                                    }];
                        }
                    });
                });
            },
        }],
    formData: function (_a) {
        var mobiles = _a.data;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, ({
                        mobiles: mobiles,
                    })];
            });
        });
    },
    data: {
        confirmDeleteModalVisible: false,
        refreshing: false,
        deleteIdx: undefined,
    },
    methods: {
        onRefreshMobile: function (e) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this.setState({
                        refreshing: true,
                    });
                    try {
                        console.log(e.detail.code);
                    }
                    catch (err) {
                        console.error(err);
                    }
                    this.setState({
                        refreshing: false,
                    });
                    return [2 /*return*/];
                });
            });
        },
        goAddMobile: function () {
            var _this = this;
            var eventLoggedIn = "mobile:me:login:".concat(Date.now());
            this.sub(eventLoggedIn, function () {
                _this.navigateBack();
            });
            this.navigateTo({
                url: '/mobile/login',
                onlyCaptcha: true,
                eventLoggedIn: eventLoggedIn,
            });
        }
    },
});
