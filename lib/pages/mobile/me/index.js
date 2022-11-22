"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
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
                var token = features.token.getToken();
                return {
                    user: {
                        id: {
                            $in: {
                                entity: 'token',
                                data: {
                                    userId: 1,
                                },
                                filter: {
                                    id: token === null || token === void 0 ? void 0 : token.id,
                                    ableState: 'enabled',
                                },
                            },
                        },
                    },
                };
            },
        }],
    formData: function (_a) {
        var mobiles = _a.data;
        return ({
            mobiles: mobiles,
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
                url: '/login',
                onlyCaptcha: true,
                eventLoggedIn: eventLoggedIn,
            });
        }
    },
});
