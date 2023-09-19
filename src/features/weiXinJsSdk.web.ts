/// <reference path="../../typings/weixin-js-sdk.d.ts" />
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

import weixin from 'weixin-js-sdk';

type Options =
    | WeixinJsSdk.CheckJsApiOptions
    | WeixinJsSdk.AddCardOptions
    | WeixinJsSdk.ChooseCardOptions
    | WeixinJsSdk.OnMenuShareTimelineOptions
    | WeixinJsSdk.OnMenuShareAppMessageOptions
    | WeixinJsSdk.OnMenuShareQQ
    | WeixinJsSdk.OnMenuShareWeibo
    | WeixinJsSdk.OnMenuShareQZone
    | WeixinJsSdk.ChooseImageOptions
    | WeixinJsSdk.PreviewImageOptions
    | WeixinJsSdk.UploadImageOptions
    | WeixinJsSdk.DownloadImageOptions
    | WeixinJsSdk.GetLocalImgDataOptions
    | WeixinJsSdk.LocalVoiceOptions
    | WeixinJsSdk.UploadVoiceOptions
    | WeixinJsSdk.DownloadVoiceOptions
    | WeixinJsSdk.OpenLocationOptions
    | WeixinJsSdk.GetLocationOptions
    | WeixinJsSdk.ScanQRCodeOptions
    | WeixinJsSdk.OpenProductSpecificViewOptions
    | WeixinJsSdk.ChooseCardOptions
    | WeixinJsSdk.OpenCardOptions
    | WeixinJsSdk.ChooseWXPayOptions;

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

    async getConfig(config: WeixinJsSdk.ConfigOptions) {
        return new Promise((resolve, reject) => {
            weixin.config(config);

            weixin.ready(() => {
                console.log('调用wx.config通过');
                resolve('');
            });
            weixin.error((err: any) => {
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
        jsApiList?: WeixinJsSdk.JSApis[];
        openTagList?: string[];
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

        let jsApiList2: WeixinJsSdk.JSApis[] = [
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
    async loadWxAPi(
        name: WeixinJsSdk.JSApis,
        options?: Options,
        jsApiList?: WeixinJsSdk.JSApis[],
        openTagList?: string[]
    ) {
        await this.init({ jsApiList, openTagList });
        const wxFn = wxPromisify((weixin as any)[name as any]);
        const result = await wxFn(options);
        return result;
    }
}
