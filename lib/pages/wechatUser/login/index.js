"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var url_1 = tslib_1.__importDefault(require("url"));
exports.default = OakPage({
    path: 'wechatUser:login',
    data: {
        error: '',
    },
    lifetimes: {
        ready: function () {
            if (process.env.OAK_PLATFORM === 'web') {
                //处理微信授权登录
                this.login();
            }
        },
    },
    methods: {
        login: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, t, features, token, url, startStr, endStr, parsedUrl, query, _b, code, state, parsedPathUrl, _c, query2, pathname, err_1;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = this, t = _a.t, features = _a.features;
                            return [4 /*yield*/, features.token.getToken()];
                        case 1:
                            token = _d.sent();
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
                            query = (parsedUrl || {}).query;
                            _b = query || {}, code = _b.code, state = _b.state;
                            if (!code || !state) {
                                this.setState({
                                    error: '缺少参数',
                                });
                                return [2 /*return*/];
                            }
                            parsedPathUrl = url_1.default.parse(decodeURIComponent(state), true);
                            _c = parsedPathUrl || {}, query2 = _c.query, pathname = _c.pathname;
                            if (!(process.env.NODE_ENV === 'production' &&
                                token)) return [3 /*break*/, 2];
                            //token有效 不调用登录
                            console.log('token有效');
                            // 如果 query2 存在isGoBack为true 返回上一页
                            if (query2 && query2.isGoBack) {
                                this.navigateBack({
                                    delta: -2,
                                });
                                return [2 /*return*/];
                            }
                            this.redirectTo({
                                url: pathname,
                            }, query2);
                            return [3 /*break*/, 6];
                        case 2:
                            console.log('token不存在或失效');
                            _d.label = 3;
                        case 3:
                            _d.trys.push([3, 5, , 6]);
                            // web微信扫码跟公众号授权
                            return [4 /*yield*/, features.token.loginWechat(code)];
                        case 4:
                            // web微信扫码跟公众号授权
                            _d.sent();
                            // 如果 query2 存在isGoBack为true 返回上一页
                            if (query2 && query2.isGoBack) {
                                this.navigateBack({
                                    delta: -2,
                                });
                                return [2 /*return*/];
                            }
                            this.redirectTo({
                                url: pathname,
                            }, query2);
                            return [3 /*break*/, 6];
                        case 5:
                            err_1 = _d.sent();
                            console.warn(err_1);
                            this.setState({
                                error: '微信登录失败',
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
