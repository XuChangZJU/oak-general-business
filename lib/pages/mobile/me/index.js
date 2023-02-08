"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
exports.default = OakComponent({
    entity: 'mobile',
    isList: true,
    projection: {
        id: 1,
        mobile: 1,
        userId: 1,
    },
    filters: [{
            filter: function () {
                var token = this.features.token.getToken();
                return {
                    userId: {
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
                };
            },
        }],
    formData: function (_a) {
        var mobiles = _a.data;
        return {
            mobiles: mobiles,
            allowRemove: mobiles.length > 1,
        };
    },
    data: {
        confirmDeleteModalVisible: false,
        refreshing: false,
        deleteIdx: undefined,
    },
    methods: {
        onRefreshMobile: function (e) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, code, errMsg;
                return tslib_1.__generator(this, function (_b) {
                    this.setState({
                        refreshing: true,
                    });
                    try {
                        _a = e.detail, code = _a.code, errMsg = _a.errMsg;
                        if (errMsg !== 'getPhoneNumber:ok') {
                            console.error(errMsg);
                            this.setMessage({
                                title: '获取手机号失败',
                                type: 'warning',
                            });
                        } else {
                            (0, assert_1.default)(code);
                            console.log(code);
                        }
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
