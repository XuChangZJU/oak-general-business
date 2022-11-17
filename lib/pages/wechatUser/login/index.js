"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var url_1 = tslib_1.__importDefault(require("url"));
exports.default = OakComponent({
    isList: false,
    data: {
        error: '',
        loading: false
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
                var features, token, url, startStr, endStr, parsedUrl, query, code, state, parsedState, stateQuery, pathname, err_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.setState({
                                loading: true
                            });
                            features = this.features;
                            return [4 /*yield*/, features.token.getToken(true)];
                        case 1:
                            token = _a.sent();
                            url = decodeURIComponent(window.location.href);
                            if (this.strCharPosition(url, '?') > 1) {
                                startStr = url.substring(0, url.lastIndexOf('?'));
                                endStr = url.substring(url.lastIndexOf('?'));
                                if (process.env.NODE_ENV === 'production') {
                                    endStr = endStr.replace(/&/g, '%26');
                                }
                                url = startStr + endStr;
                            }
                            parsedUrl = url_1.default.parse(url, true);
                            query = parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.query;
                            code = query === null || query === void 0 ? void 0 : query.code;
                            state = query === null || query === void 0 ? void 0 : query.state;
                            if (!code) {
                                this.setState({
                                    error: '缺少code参数',
                                    loading: false,
                                });
                                return [2 /*return*/];
                            }
                            parsedState = url_1.default.parse(decodeURIComponent(state), true);
                            stateQuery = parsedState === null || parsedState === void 0 ? void 0 : parsedState.query;
                            pathname = parsedState === null || parsedState === void 0 ? void 0 : parsedState.pathname;
                            if (!(process.env.NODE_ENV === 'production' &&
                                token)) return [3 /*break*/, 2];
                            //token有效 不调用登录
                            console.log('token有效');
                            this.setState({
                                loading: false,
                            });
                            if (!state) {
                                this.redirectTo({
                                    url: '/',
                                });
                                return [2 /*return*/];
                            }
                            if (stateQuery === null || stateQuery === void 0 ? void 0 : stateQuery.backUrl) {
                                // todo 现在不存在跨域名登录 不需要使用window.location.replace
                                // window.location.replace(stateQuery?.backUrl as string);
                                this.redirectTo({
                                    url: stateQuery === null || stateQuery === void 0 ? void 0 : stateQuery.backUrl,
                                });
                                return [2 /*return*/];
                            }
                            // 如果 stateQuery 存在isGoBack为 返回上一页
                            if (stateQuery === null || stateQuery === void 0 ? void 0 : stateQuery.isGoBack) {
                                this.navigateBack({
                                    delta: -2,
                                });
                                return [2 /*return*/];
                            }
                            this.redirectTo({
                                url: pathname,
                            }, stateQuery);
                            return [3 /*break*/, 6];
                        case 2:
                            console.log('token不存在或失效');
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            // web微信扫码跟公众号授权
                            return [4 /*yield*/, features.token.loginWechat(code)];
                        case 4:
                            // web微信扫码跟公众号授权
                            _a.sent();
                            // 如果 stateQuery 存在isGoBack为true 返回上一页
                            this.setState({
                                loading: false,
                            });
                            if (!state) {
                                this.redirectTo({
                                    url: '/',
                                });
                                return [2 /*return*/];
                            }
                            if (stateQuery === null || stateQuery === void 0 ? void 0 : stateQuery.backUrl) {
                                // todo 现在不存在跨域名登录 不需要使用window.location.replace
                                // window.location.replace(stateQuery?.backUrl as string);
                                this.redirectTo({
                                    url: stateQuery === null || stateQuery === void 0 ? void 0 : stateQuery.backUrl,
                                });
                                return [2 /*return*/];
                            }
                            // 如果 stateQuery 存在isGoBack为 返回上一页
                            if (stateQuery === null || stateQuery === void 0 ? void 0 : stateQuery.isGoBack) {
                                this.navigateBack({
                                    delta: -2,
                                });
                                return [2 /*return*/];
                            }
                            this.redirectTo({
                                url: pathname,
                            }, stateQuery);
                            return [3 /*break*/, 6];
                        case 5:
                            err_1 = _a.sent();
                            console.warn(err_1);
                            this.setState({
                                error: '微信登录失败',
                                loading: false,
                            });
                            throw err_1;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        },
        strCharPosition: function (str, char) {
            var pos;
            var arr = [];
            pos = str.indexOf(char);
            while (pos > -1) {
                arr.push(pos);
                pos = str.indexOf(char, pos + 1);
            }
            return arr.length;
        },
    },
});
