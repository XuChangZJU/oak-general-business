"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    isList: false,
    data: {
        error: '',
        loading: false,
    },
    lifetimes: {
        attached: function () {
            if (process.env.OAK_PLATFORM === 'web') {
                //处理微信授权登录
                this.login();
            }
        },
    },
    methods: {
        login: function () {
            var _a, _b, _c;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _d, features, t, token, url, urlParse, code, state, wechatLoginId, err_1;
                return tslib_1.__generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            this.setState({
                                loading: true,
                            });
                            _d = this, features = _d.features, t = _d.t;
                            token = features.token.getToken(true);
                            url = window.location.href;
                            urlParse = new URL(url);
                            code = (_a = urlParse === null || urlParse === void 0 ? void 0 : urlParse.searchParams) === null || _a === void 0 ? void 0 : _a.get('code');
                            state = (_b = urlParse === null || urlParse === void 0 ? void 0 : urlParse.searchParams) === null || _b === void 0 ? void 0 : _b.get('state');
                            wechatLoginId = (_c = urlParse === null || urlParse === void 0 ? void 0 : urlParse.searchParams) === null || _c === void 0 ? void 0 : _c.get('wechatLoginId');
                            if (!code) {
                                this.setState({
                                    error: t('missingCodeParameter'),
                                    loading: false,
                                });
                                return [2 /*return*/];
                            }
                            if (!(process.env.NODE_ENV === 'production' &&
                                (token === null || token === void 0 ? void 0 : token.ableState) === 'enabled')) return [3 /*break*/, 1];
                            this.setState({
                                loading: false,
                            });
                            this.go(state);
                            return [3 /*break*/, 4];
                        case 1:
                            _e.trys.push([1, 3, , 4]);
                            // web微信扫码跟公众号授权
                            return [4 /*yield*/, features.token.loginWechat(code, {
                                    wechatLoginId: wechatLoginId,
                                })];
                        case 2:
                            // web微信扫码跟公众号授权
                            _e.sent();
                            this.setState({
                                loading: false,
                            });
                            this.go(state);
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _e.sent();
                            this.setState({
                                error: t('weChatLoginFailed'),
                                loading: false,
                            });
                            throw err_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        go: function (state) {
            if (!state) {
                this.navigateBack(2);
                return;
            }
            this.redirectTo({
                url: state,
            });
        },
    },
});
