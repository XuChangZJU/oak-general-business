import { Feature } from 'oak-frontend-base';
import {
    isIos,
    isWeiXin,
    isWeiXinDevTools,
} from 'oak-frontend-base/es/utils/utils';
import { promisify as wxPromisify } from 'oak-frontend-base/es/utils/promisify';

import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../oak-app-domain';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { LocalStorage } from 'oak-frontend-base/es/features/localStorage';
import { Environment } from 'oak-frontend-base/es/features/environment';
import { WebEnv } from 'oak-domain/lib/types/Environment';
import { uniq } from 'oak-domain/lib/utils/lodash';

import wx from 'weixin-js-sdk';

type ConfigOptions = {
    debug?: boolean; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: string; // 必填，公众号的唯一标识
    timestamp: number; // 必填，生成签名的时间戳
    nonceStr: string; // 必填，生成签名的随机串
    signature: string; // 必填，签名，见附录1
    jsApiList?: wx.jsApiList; // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    openTagList?: wx.openTagList;
};

type ParamOptions =
    | wx.IcheckJsApi
    | wx.IaddCard
    | wx.IchooseCard
    | wx.IonMenuShareTimeline
    | wx.IonMenuShareAppMessage
    | wx.IonMenuShareQQ
    | wx.IonMenuShareWeibo
    | wx.IonMenuShareQZone
    | wx.IchooseImage
    | wx.IpreviewImage
    | wx.IuploadImage
    | wx.IdownloadImage
    | wx.IgetLocalImgData
    | wx.IplaypausestopVoice
    | wx.IupdownloadVoice
    | wx.IopenLocation
    | wx.IgetLocation
    | wx.IscanQRCode
    | wx.IopenProductSpecificView
    | wx.IchooseCard
    | wx.IopenCard
    | wx.IchooseWXPay;

export class WeiXinJsSdk<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>
> extends Feature {
    private cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>;
    private storage: LocalStorage;
    private environment: Environment;
    private landingUrl?: string; //解决在IOS上，无论路由切换到哪个页面，实际真正有效的的签名URL是【第一次进入应用时的URL】;

    constructor(
        cache: Cache<ED, Cxt, FrontCxt, AD>,
        storage: LocalStorage,
        environment: Environment
    ) {
        super();
        this.cache = cache;
        this.storage = storage;
        this.landingUrl = undefined;
        this.environment = environment;
    }

    async signatureJsSDK(url: string) {
        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec('signatureJsSDK', {
            url,
            env: env as WebEnv,
        });

        return result;
    }

    async getConfig(config: ConfigOptions) {
        return new Promise((resolve, reject) => {
            wx.config(config);

            wx.ready(() => {
                console.log('调用wx.config通过');
                resolve('');
            });
            wx.error((err: any) => {
                const error = `调用wx.config出错: ${JSON.stringify(
                    err
                )}，请重新尝试`;
                reject(error);
            });
        });
    }

    setLandingUrl(url?: string) {
        if (isIos && isWeiXin) {
            this.landingUrl = url;
        }
    }

    async init(options?: {
        jsApiList?: wx.jsApiList;
        openTagList?: wx.openTagList;
    }) {
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

        let jsApiList2: wx.jsApiList = [
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

        let openTagList2: wx.openTagList = ['wx-open-launch-weapp'];
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
            openTagList: openTagList2,
        });
    }

    /**
     * 微信jssdk 传入方法名
     */
    async loadWxAPi(
        name: wx.ApiMethod,
        options?: ParamOptions,
        jsApiList?: wx.jsApiList,
        openTagList?: wx.openTagList
    ) {
        await this.init({ jsApiList, openTagList });
        const wxFn = wxPromisify(wx[name]);
        const result = await wxFn(options);
        return result;
    }
}
