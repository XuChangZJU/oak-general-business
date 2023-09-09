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
                var features, token, url, urlParse, query, code, state, wechatLoginId, err_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.setState({
                                loading: true,
                            });
                            features = this.features;
                            token = features.token.getToken(true);
                            url = window.location.href;
                            urlParse = url_1.default.parse(url, true);
                            query = urlParse === null || urlParse === void 0 ? void 0 : urlParse.query;
                            code = query === null || query === void 0 ? void 0 : query.code;
                            state = query === null || query === void 0 ? void 0 : query.state;
                            wechatLoginId = query === null || query === void 0 ? void 0 : query.wechatLoginId;
                            if (!code) {
                                this.setState({
                                    error: '缺少code参数',
                                    loading: false,
                                });
                                return [2 /*return*/];
                            }
                            if (!(process.env.NODE_ENV === 'production' && token)) return [3 /*break*/, 1];
                            //token有效 不调用登录
                            console.log('token有效');
                            this.setState({
                                loading: false,
                            });
                            this.go(state);
                            return [3 /*break*/, 5];
                        case 1:
                            console.log('token不存在或失效');
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            // web微信扫码跟公众号授权
                            return [4 /*yield*/, features.token.loginWechat(code, {
                                    wechatLoginId: wechatLoginId,
                                })];
                        case 3:
                            // web微信扫码跟公众号授权
                            _a.sent();
                            this.setState({
                                loading: false,
                            });
                            this.go(state);
                            return [3 /*break*/, 5];
                        case 4:
                            err_1 = _a.sent();
                            this.setState({
                                error: '微信登录失败',
                                loading: false,
                            });
                            throw err_1;
                        case 5: return [2 /*return*/];
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
