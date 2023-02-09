"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SEND_KEY = 'captcha:sendAt';
exports.default = OakComponent({
    isList: false,
    projection: {
        id: 1,
        mobile: 1,
        userId: 1,
    },
    data: {
        mobile: '',
        captcha: '',
        counter: 0,
        refreshing: false,
        password: '',
    },
    properties: {
        onlyCaptcha: Boolean,
        onlyPassword: Boolean,
        eventLoggedIn: String,
        callback: Function,
    },
    formData: function (_a) {
        var _this = this;
        var features = _a.features;
        var lastSendAt = features.localStorage.load(SEND_KEY);
        var now = Date.now();
        var counter = 0;
        if (typeof lastSendAt === 'number') {
            counter = Math.max(60 - Math.ceil((now - lastSendAt) / 1000), 0);
            if (counter > 0) {
                this.counterHandler = setTimeout(function () { return _this.reRender(); }, 1000);
            }
            else if (this.counterHandler) {
                clearTimeout(this.counterHandler);
                this.counterHandler = undefined;
            }
        }
        return {
            counter: counter,
        };
    },
    methods: {
        setMobile: function (value) {
            this.setState({
                mobile: value,
            });
        },
        setCaptcha: function (value) {
            this.setState({
                captcha: value,
            });
        },
        sendCaptcha: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var mobile, result, err_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mobile = this.state.mobile;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.features.token.sendCaptcha(mobile)];
                        case 2:
                            result = _a.sent();
                            // 显示返回消息
                            this.setMessage({
                                type: 'success',
                                content: result,
                            });
                            this.save(SEND_KEY, Date.now());
                            this.reRender();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            this.setMessage({
                                type: 'error',
                                content: err_1.message,
                            });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        loginByMobile: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, eventLoggedIn, callback, _b, mobile, password, captcha, err_2;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.props, eventLoggedIn = _a.eventLoggedIn, callback = _a.callback;
                            _b = this.state, mobile = _b.mobile, password = _b.password, captcha = _b.captcha;
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.features.token.loginByMobile(mobile, password, captcha)];
                        case 2:
                            _c.sent();
                            if (typeof callback === 'function') {
                                callback();
                            }
                            else if (eventLoggedIn) {
                                this.pub(eventLoggedIn);
                            }
                            else {
                                this.navigateBack();
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _c.sent();
                            this.setMessage({
                                type: 'error',
                                content: err_2.message,
                            });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        onRefreshMobile: function (e) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, code, errMsg, err_3;
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
                            err_3 = _b.sent();
                            console.error(err_3);
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
    },
});
