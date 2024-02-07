"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeiXinJsSdk = void 0;
const tslib_1 = require("tslib");
const oak_frontend_base_1 = require("oak-frontend-base");
const utils_1 = require("oak-frontend-base/es/utils/utils");
const promisify_1 = require("oak-frontend-base/es/utils/promisify");
const lodash_1 = require("oak-domain/lib/utils/lodash");
const weixin_js_sdk_1 = tslib_1.__importDefault(require("weixin-js-sdk"));
class WeiXinJsSdk extends oak_frontend_base_1.Feature {
    cache;
    storage;
    environment;
    landingUrl; //解决在IOS上，无论路由切换到哪个页面，实际真正有效的的签名URL是【第一次进入应用时的URL】;
    constructor(cache, storage, environment) {
        super();
        this.cache = cache;
        this.storage = storage;
        this.landingUrl = undefined;
        this.environment = environment;
    }
    async signatureJsSDK(url) {
        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec('signatureJsSDK', {
            url,
            env: env,
        });
        return result;
    }
    async getConfig(config) {
        return new Promise((resolve, reject) => {
            weixin_js_sdk_1.default.config(config);
            weixin_js_sdk_1.default.ready(() => {
                console.log('调用wx.config通过');
                resolve('');
            });
            weixin_js_sdk_1.default.error((err) => {
                const error = `调用wx.config出错: ${JSON.stringify(err)}，请重新尝试`;
                reject(error);
            });
        });
    }
    setLandingUrl(url) {
        if (utils_1.isIos && utils_1.isWeiXin) {
            this.landingUrl = url;
        }
    }
    async init(options) {
        if (!utils_1.isWeiXin) {
            console.warn('只能在微信客户端初始化JSSDK');
            return;
        }
        const { jsApiList, openTagList, debug = process.env.NODE_ENV === 'development', } = options || {};
        let url = window.location.href;
        //在ios上 实际真正有效的的签名URL是【第一次进入应用时的URL】
        if (utils_1.isIos && !utils_1.isWeiXinDevTools && this.landingUrl) {
            url = this.landingUrl;
        }
        const splitUrl = url.split('#')[0];
        const result = await this.signatureJsSDK(splitUrl); // 接口回来的是noncestr 不是nonceStr
        let jsApiList2 = [
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
        let openTagList2 = ['wx-open-launch-weapp'];
        if (openTagList && openTagList instanceof Array) {
            openTagList2 = (0, lodash_1.uniq)(openTagList2.concat(openTagList));
        }
        return this.getConfig({
            debug: debug,
            appId: result.appId,
            timestamp: result.timestamp,
            nonceStr: result.noncestr,
            signature: result.signature,
            jsApiList: jsApiList2,
            openTagList: openTagList2,
        });
    }
    /**
     * 微信jssdk 传入方法名
     */
    async loadWxAPi(name, options, jsApiList, openTagList) {
        await this.init({ jsApiList, openTagList });
        const wxFn = (0, promisify_1.promisify)(weixin_js_sdk_1.default[name]);
        const result = await wxFn(options);
        return result;
    }
}
exports.WeiXinJsSdk = WeiXinJsSdk;
