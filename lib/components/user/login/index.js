"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constants_1 = require("../../../config/constants");
var SEND_KEY = constants_1.LOCAL_STORAGE_KEYS.captchaSendAt;
var LOGIN_MODE = constants_1.LOCAL_STORAGE_KEYS.loginMode;
var SEND_CAPTCHA_LATENCY = process.env.NODE_ENV === 'development' ? 10 : 60;
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
        disabled: '',
        redirectUri: '',
        url: '', // 登录成功后redirectTo的页面，不配置的话就认为是goBack
    },
    formData: function (_a) {
        var _this = this;
        var _b, _c, _d, _e, _f, _g;
        var features = _a.features, props = _a.props;
        var application = features.application.getApplication();
        var loginMode = features.localStorage.load(LOGIN_MODE) || 2;
        var lastSendAt = features.localStorage.load(SEND_KEY);
        var now = Date.now();
        var counter = 0;
        if (typeof lastSendAt === 'number') {
            counter = Math.max(SEND_CAPTCHA_LATENCY - Math.ceil((now - lastSendAt) / 1000), 0);
            if (counter > 0) {
                this.counterHandler = setTimeout(function () { return _this.reRender(); }, 1000);
            }
            else if (this.counterHandler) {
                clearTimeout(this.counterHandler);
                this.counterHandler = undefined;
            }
        }
        var appType = application === null || application === void 0 ? void 0 : application.type;
        var config = application === null || application === void 0 ? void 0 : application.config;
        var appId;
        var domain; //网站扫码 授权回调域
        var isSupportScan = false; //是否支持微信扫码登录
        var isSupportWechat = false; // 微信扫码网站登录
        var isSupportWechatPublic = false; // 微信扫码公众号登录
        var isSupportGrant = false; // 是否支持微信公众号授权登录
        if (appType === 'wechatPublic') {
            var config2 = config;
            var isService = config2 === null || config2 === void 0 ? void 0 : config2.isService; //是否服务号 服务号才能授权登录
            appId = config2 === null || config2 === void 0 ? void 0 : config2.appId;
            isSupportGrant = !!(isService && appId);
            isSupportWechat = !!((_b = config2 === null || config2 === void 0 ? void 0 : config2.passport) === null || _b === void 0 ? void 0 : _b.includes('wechat'));
            isSupportWechatPublic = !!((_c = config2 === null || config2 === void 0 ? void 0 : config2.passport) === null || _c === void 0 ? void 0 : _c.includes('wechatPublic')); //是否开启
        }
        else if (appType === 'web') {
            var config2 = config;
            appId = (_d = config2 === null || config2 === void 0 ? void 0 : config2.wechat) === null || _d === void 0 ? void 0 : _d.appId;
            domain = (_e = config2 === null || config2 === void 0 ? void 0 : config2.wechat) === null || _e === void 0 ? void 0 : _e.domain;
            isSupportWechat = !!((_f = config2 === null || config2 === void 0 ? void 0 : config2.passport) === null || _f === void 0 ? void 0 : _f.includes('wechat'));
            isSupportWechatPublic = !!((_g = config2 === null || config2 === void 0 ? void 0 : config2.passport) === null || _g === void 0 ? void 0 : _g.includes('wechatPublic')); //是否开启
        }
        if (isSupportGrant) {
            loginMode = 1;
        }
        else if (props.onlyPassword) {
            loginMode = 1;
        }
        else if (props.onlyCaptcha) {
            loginMode = 2;
        }
        else {
            loginMode = loginMode === 3 && !isSupportScan ? 2 : loginMode;
        }
        return {
            counter: counter,
            loginMode: loginMode,
            appId: appId,
            isSupportWechat: isSupportWechat,
            isSupportWechatPublic: isSupportWechatPublic,
            isSupportGrant: isSupportGrant,
            domain: domain,
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
                            return [4 /*yield*/, this.features.token.sendCaptcha(mobile, 'login')];
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
        loginByMobile: function (mobile, password, captcha) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var url, err_2;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = this.props.url;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            this.setState({
                                loading: true,
                            });
                            return [4 /*yield*/, this.features.token.loginByMobile(mobile, password, captcha)];
                        case 2:
                            _a.sent();
                            this.setState({
                                loading: false,
                            });
                            if (url) {
                                this.redirectTo({
                                    url: url,
                                });
                                return [2 /*return*/];
                            }
                            this.navigateBack();
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _a.sent();
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
        setLoginMode: function (value) {
            this.features.localStorage.save(LOGIN_MODE, value);
            this.setState({
                loginMode: value,
            });
        },
    },
});
