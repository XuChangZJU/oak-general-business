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
        onlyCaptcha: Boolean,
        onlyPassword: Boolean,
        eventLoggedIn: String,
        backUrl: String, //回调url
    },
    formData: function (_a) {
        var _b, _c;
        var features = _a.features;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var application, appId, loginAgreed, loginMode, lastSendAt, now, counter;
            var _this = this;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, features.application.getApplication()];
                    case 1:
                        application = _d.sent();
                        appId = (_c = (_b = application === null || application === void 0 ? void 0 : application.config) === null || _b === void 0 ? void 0 : _b.wechat) === null || _c === void 0 ? void 0 : _c.appId;
                        loginAgreed = features.localStorage.load(LOGIN_AGREED);
                        loginMode = features.localStorage.load(LOGIN_MODE) || 2;
                        lastSendAt = features.localStorage.load(SEND_KEY);
                        now = Date.now();
                        counter = 0;
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
                        return [2 /*return*/, {
                                counter: counter,
                                loginAgreed: loginAgreed,
                                loginMode: loginMode,
                                appId: appId,
                            }];
                }
            });
        });
    },
    methods: {
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
                var _a, eventLoggedIn, backUrl, _b, mobile, password, captcha, loginAgreed, err_2;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.props, eventLoggedIn = _a.eventLoggedIn, backUrl = _a.backUrl;
                            _b = this.state, mobile = _b.mobile, password = _b.password, captcha = _b.captcha, loginAgreed = _b.loginAgreed;
                            if (!loginAgreed) {
                                this.setMessage({
                                    type: 'info',
                                    content: '请阅读并同意《服务条款》和《隐私政策》',
                                });
                                return [2 /*return*/];
                            }
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            this.setState({
                                loading: true,
                            });
                            return [4 /*yield*/, this.features.token.loginByMobile(mobile, password, captcha)];
                        case 2:
                            _c.sent();
                            this.setState({
                                loading: false,
                            });
                            if (eventLoggedIn) {
                                this.pub(eventLoggedIn);
                                return [2 /*return*/];
                            }
                            if (backUrl) {
                                window.location.replace(backUrl);
                                return [2 /*return*/];
                            }
                            this.navigateBack();
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _c.sent();
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
        setLoginAgreed: function (checked) {
            this.features.localStorage.save(LOGIN_AGREED, checked);
            this.setState({
                loginAgreed: checked,
            });
        },
        setMode: function (value) {
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
