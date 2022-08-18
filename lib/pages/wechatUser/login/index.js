"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = __importDefault(require("url"));
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
            return __awaiter(this, void 0, void 0, function () {
                var _a, t, features, token, url, startStr, endStr, parsedUrl, query, _b, code, state, parsedPathUrl, _c, query2, pathname, err_1;
                return __generator(this, function (_d) {
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
