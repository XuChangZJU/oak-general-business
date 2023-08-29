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
        ableState: 1,
    },
    filters: [
        {
            filter: function () {
                // const token = this.features.token.getToken();
                var userId = this.features.token.getUserId();
                return {
                    userId: userId,
                };
            },
        },
    ],
    formData: function (_a) {
        var mobiles = _a.data, features = _a.features;
        var token = features.token.getToken();
        var tokenMobileId = token.entity === 'mobile' && token.entityId;
        return {
            tokenMobileId: tokenMobileId,
            mobiles: mobiles,
            allowRemove: mobiles.length > 1,
        };
    },
    data: {
        confirmDeleteModalVisible: false,
        refreshing: false,
        deleteIdx: undefined,
    },
    properties: {
        showBack: false,
    },
    methods: {
        onRefreshMobile: function (e) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, code, errMsg, err_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.setState({
                                refreshing: true,
                            });
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 5, , 6]);
                            _a = e.detail, code = _a.code, errMsg = _a.errMsg;
                            if (!(errMsg !== 'getPhoneNumber:ok')) return [3 /*break*/, 2];
                            console.error(errMsg);
                            this.setMessage({
                                title: '获取手机号失败',
                                type: 'warning',
                            });
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.features.token.getWechatMpUserPhoneNumber(code)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            err_1 = _b.sent();
                            console.error(err_1);
                            return [3 /*break*/, 6];
                        case 6:
                            this.setState({
                                refreshing: false,
                            });
                            return [2 /*return*/];
                    }
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
                eventLoggedIn: eventLoggedIn,
            });
        },
        onRemoveConfirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var mobileId;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mobileId = this.state.mobileId;
                            this.removeItem(mobileId);
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            this.setState({
                                confirmDeleteModalVisible: false,
                                mobileId: '',
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        onRemoveModalOpen: function (e) {
            var mobileId = e.currentTarget.dataset.id;
            this.setState({
                confirmDeleteModalVisible: true,
                mobileId: mobileId,
            });
        },
        onRemoveModalClose: function () {
            this.setState({
                confirmDeleteModalVisible: false,
                mobileId: '',
            });
        },
    },
});
