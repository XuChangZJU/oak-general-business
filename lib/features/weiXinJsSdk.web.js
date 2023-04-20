"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeiXinJsSdk = void 0;
var tslib_1 = require("tslib");
var Feature_1 = require("oak-frontend-base/lib/types/Feature");
var utils_1 = require("oak-frontend-base/lib/utils/utils");
var promisify_1 = require("oak-frontend-base/lib/utils/promisify");
var env_1 = require("../utils/env");
var lodash_1 = require("oak-domain/lib/utils/lodash");
// const weixin = require('weixin-js-sdk');
var weixin_js_sdk_1 = tslib_1.__importDefault(require("weixin-js-sdk"));
var WeiXinJsSdk = /** @class */ (function (_super) {
    tslib_1.__extends(WeiXinJsSdk, _super);
    function WeiXinJsSdk(cache, storage) {
        var _this = _super.call(this) || this;
        _this.cache = cache;
        _this.storage = storage;
        _this.landingUrl = undefined;
        return _this;
    }
    WeiXinJsSdk.prototype.signatureJsSDK = function (url) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var env, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, env_1.getEnv)()];
                    case 1:
                        env = _a.sent();
                        return [4 /*yield*/, this.cache.exec('signatureJsSDK', {
                                url: url,
                                env: env,
                            })];
                    case 2:
                        result = (_a.sent()).result;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    WeiXinJsSdk.prototype.getConfig = function (config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        weixin_js_sdk_1.default.config(config);
                        weixin_js_sdk_1.default.ready(function () {
                            console.log('调用wx.config通过');
                            resolve('');
                        });
                        weixin_js_sdk_1.default.error(function (err) {
                            var error = "\u8C03\u7528wx.config\u51FA\u9519: ".concat(JSON.stringify(err), "\uFF0C\u8BF7\u91CD\u65B0\u5C1D\u8BD5");
                            reject(error);
                        });
                    })];
            });
        });
    };
    WeiXinJsSdk.prototype.setLandingUrl = function (url) {
        if (utils_1.isIos && utils_1.isWeiXin) {
            this.landingUrl = url;
        }
    };
    WeiXinJsSdk.prototype.init = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, jsApiList, openTagList, url, splitUrl, result, jsApiList2, openTagList2;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!utils_1.isWeiXin) {
                            console.warn('只能在微信客户端初始化JSSDK');
                            return [2 /*return*/];
                        }
                        _a = options || {}, jsApiList = _a.jsApiList, openTagList = _a.openTagList;
                        url = window.location.href;
                        //在ios上 实际真正有效的的签名URL是【第一次进入应用时的URL】
                        if (utils_1.isIos && !utils_1.isWeiXinDevTools && this.landingUrl) {
                            url = this.landingUrl;
                        }
                        splitUrl = url.split('#')[0];
                        return [4 /*yield*/, this.signatureJsSDK(splitUrl)];
                    case 1:
                        result = _b.sent();
                        jsApiList2 = [
                            'updateAppMessageShareData',
                            'updateTimelineShareData',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'getLocation',
                            'chooseWXPay',
                            'scanQRCode',
                            'openLocation',
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage',
                        ];
                        if (jsApiList && jsApiList instanceof Array) {
                            jsApiList2 = (0, lodash_1.uniq)(jsApiList2.concat(jsApiList));
                        }
                        openTagList2 = ['wx-open-launch-weapp'];
                        if (openTagList && openTagList instanceof Array) {
                            openTagList2 = (0, lodash_1.uniq)(openTagList2.concat(openTagList));
                        }
                        return [2 /*return*/, this.getConfig({
                                debug: process.env.NODE_ENV === 'development',
                                appId: result.appId,
                                timestamp: result.timestamp,
                                nonceStr: result.noncestr,
                                signature: result.signature,
                                jsApiList: jsApiList2,
                                beta: false,
                                openTagList: openTagList2,
                            })];
                }
            });
        });
    };
    /**
     * 微信jssdk 传入方法名
     */
    WeiXinJsSdk.prototype.loadWxAPi = function (name, options, jsApiList, openTagList) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var wxFn, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.init({ jsApiList: jsApiList, openTagList: openTagList })];
                    case 1:
                        _a.sent();
                        wxFn = (0, promisify_1.promisify)(weixin_js_sdk_1.default[name]);
                        return [4 /*yield*/, wxFn(options)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return WeiXinJsSdk;
}(Feature_1.Feature));
exports.WeiXinJsSdk = WeiXinJsSdk;
