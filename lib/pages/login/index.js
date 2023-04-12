"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SEND_KEY = 'captcha:sendAt';
var LOGIN_AGREED = 'login:agreed';
var LOGIN_MODE = 'login:mode';
exports.default = OakComponent({
    isList: false,
    projection: {
        id: 1,
        mobile: 1,
        userId: 1,
    },
    data: {
        mobile: '',
        password: '',
        captcha: '',
        counter: 0,
        loginAgreed: false,
        loginMode: 2,
        loading: false,
    },
    properties: {
        onlyCaptcha: false,
        onlyPassword: false,
        eventLoggedIn: '',
        backUrl: '', //回调url
    },
    formData: function () {
        var _this = this;
        var _a, _b;
        var features = this.features;
        var application = features.application.getApplication();
        var appId = (_b = (_a = application === null || application === void 0 ? void 0 : application.config) === null || _a === void 0 ? void 0 : _a.wechat) === null || _b === void 0 ? void 0 : _b.appId;
        var loginAgreed = features.localStorage.load(LOGIN_AGREED);
        var loginMode = features.localStorage.load(LOGIN_MODE) || 2;
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
            loginAgreed: loginAgreed,
            loginMode: loginMode,
            appId: appId,
        };
    },
    lifetimes: {
        attached: function () {
            // 如果已登录， 返回上一页
            var token = this.features.token.getTokenValue();
            if (token) {
                this.navigateBack();
            }
        },
    },
    methods: {
        sendCaptcha: function (mobile) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var result, err_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.features.token.sendCaptcha(mobile)];
                        case 1:
                            result = _a.sent();
                            // 显示返回消息
                            this.setMessage({
                                type: 'success',
                                content: result,
                            });
                            this.save(SEND_KEY, Date.now());
                            this.reRender();
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _a.sent();
                            this.setMessage({
                                type: 'error',
                                content: err_1.message,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        loginByMobile: function (mobile, loginAgreed, password, captcha) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, eventLoggedIn, backUrl, err_2;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.props, eventLoggedIn = _a.eventLoggedIn, backUrl = _a.backUrl;
                            if (!loginAgreed) {
                                this.setMessage({
                                    type: 'info',
                                    content: '请阅读并同意服务条款和隐私政策',
                                });
                                return [2 /*return*/];
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            this.setState({
                                loading: true,
                            });
                            return [4 /*yield*/, this.features.token.loginByMobile(mobile, password, captcha)];
                        case 2:
                            _b.sent();
                            this.setState({
                                loading: false,
                            });
                            if (eventLoggedIn) {
                                this.pub(eventLoggedIn);
                                return [2 /*return*/];
                            }
                            if (backUrl) {
                                // todo 现在不存在跨域名登录 不需要使用window.location.replace
                                //  window.location.replace(backUrl);
                                this.redirectTo({
                                    url: backUrl,
                                });
                                return [2 /*return*/];
                            }
                            this.navigateBack();
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _b.sent();
                            this.setState({
                                loading: false,
                            });
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
        loginByMobileWeb: function (mobile, loginAgreed, password, captcha, loginMode) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.loginByMobile(mobile, loginAgreed, password, captcha)];
                        case 1:
                            _a.sent();
                            if (loginAgreed !== this.state.loginAgreed) {
                                this.setLoginAgreed(loginAgreed);
                            }
                            if (loginMode && loginMode !== this.state.loginMode) {
                                this.setLoginMode(loginMode);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        setLoginAgreed: function (checked) {
            this.features.localStorage.save(LOGIN_AGREED, checked);
            this.setState({
                loginAgreed: checked,
            });
        },
        setLoginMode: function (value) {
            this.features.localStorage.save(LOGIN_MODE, value);
            this.setState({
                loginMode: value,
            });
        },
        goPage: function (type) {
            var width = this.props.width;
            switch (type) {
                case 'service':
                    if (width !== 'xs') {
                        window.open('');
                    }
                    else {
                        this.navigateTo({
                            url: '',
                        });
                    }
                    break;
                case 'privacy':
                    if (width !== 'xs') {
                        window.open('');
                    }
                    else {
                        this.navigateTo({
                            url: '',
                        });
                    }
                    break;
                default:
                    break;
            }
        },
    },
});
