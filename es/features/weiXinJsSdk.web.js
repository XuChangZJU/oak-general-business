import { Feature } from 'oak-frontend-base';
import { isIos, isWeiXin, isWeiXinDevTools } from 'oak-frontend-base/es/utils/utils';
import { promisify as wxPromisify } from 'oak-frontend-base/es/utils/promisify';
import { uniq } from 'oak-domain/lib/utils/lodash';
// const weixin = require('weixin-js-sdk');
import weixin from 'weixin-js-sdk';
export class WeiXinJsSdk extends Feature {
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
            weixin.config(config);
            weixin.ready(() => {
                console.log('调用wx.config通过');
                resolve('');
            });
            weixin.error((err) => {
                const error = `调用wx.config出错: ${JSON.stringify(err)}，请重新尝试`;
                reject(error);
            });
        });
    }
    setLandingUrl(url) {
        if (isIos && isWeiXin) {
            this.landingUrl = url;
        }
    }
    async init(options) {
        if (!isWeiXin) {
            console.warn('只能在微信客户端初始化JSSDK');
            return;
        }
        const { jsApiList, openTagList } = options || {};
        let url = window.location.href;
        //在ios上 实际真正有效的的签名URL是【第一次进入应用时的URL】
        if (isIos && !isWeiXinDevTools && this.landingUrl) {
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
            jsApiList2 = uniq(jsApiList2.concat(jsApiList));
        }
        let openTagList2 = ['wx-open-launch-weapp'];
        if (openTagList && openTagList instanceof Array) {
            openTagList2 = uniq(openTagList2.concat(openTagList));
        }
        return this.getConfig({
            debug: process.env.NODE_ENV === 'development',
            appId: result.appId,
            timestamp: result.timestamp,
            nonceStr: result.noncestr,
            signature: result.signature,
            jsApiList: jsApiList2,
            beta: false,
            openTagList: openTagList2,
        });
    }
    /**
     * 微信jssdk 传入方法名
     */
    async loadWxAPi(name, options, jsApiList, openTagList) {
        await this.init({ jsApiList, openTagList });
        const wxFn = wxPromisify(weixin[name]);
        const result = await wxFn(options);
        return result;
    }
}
