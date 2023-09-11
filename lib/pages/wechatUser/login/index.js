"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var url_1 = tslib_1.__importDefault(require("url"));
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
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, features, t, token, url, urlParse, query, code, state, wechatLoginId, err_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.setState({
                                loading: true,
                            });
                            _a = this, features = _a.features, t = _a.t;
                            token = features.token.getToken(true);
                            url = window.location.href;
                            urlParse = url_1.default.parse(url, true);
                            query = urlParse === null || urlParse === void 0 ? void 0 : urlParse.query;
                            code = query === null || query === void 0 ? void 0 : query.code;
                            state = query === null || query === void 0 ? void 0 : query.state;
                            wechatLoginId = query === null || query === void 0 ? void 0 : query.wechatLoginId;
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
                            _b.trys.push([1, 3, , 4]);
                            // web微信扫码跟公众号授权
                            return [4 /*yield*/, features.token.loginWechat(code, {
                                    wechatLoginId: wechatLoginId,
                                })];
                        case 2:
                            // web微信扫码跟公众号授权
                            _b.sent();
                            this.setState({
                                loading: false,
                            });
                            this.go(state);
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _b.sent();
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
