import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../general-app-domain';
import { AspectDict } from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { LocalStorage } from 'oak-frontend-base/lib/features/localStorage';
import { getEnv } from '../utils/env';
import { WebEnv } from '../general-app-domain/Token/Schema';
import { uniq } from 'oak-domain/lib/utils/lodash';

// const weixin = require('weixin-js-sdk');
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

    constructor(cache: Cache<ED, Cxt, FrontCxt, AD>, storage: LocalStorage) {
        super();
        this.cache = cache;
        this.storage = storage;
    }

    async signatureJsSDK(url: string) {
        const env = await getEnv();
        const { result } = await this.cache.exec('signatureJsSDK', {
            url,
            env: env as WebEnv,
        });

        return result;
    }

    wxConfig(config: WeixinJsSdk.ConfigOptions) {
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

    async initWeiXinJsSDK(options?: {
        jsApiList?: WeixinJsSdk.JSApis[];
        openTagList?: string[];
    }) {
        const { jsApiList, openTagList } = options || {};

        const url = window.location.href;
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

        return this.wxConfig({
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
    async loadWeiXinJsSDK(
        name: WeixinJsSdk.JSApis,
        options?: Options,
        jsApiList?: WeixinJsSdk.JSApis[],
        openTagList?: string[]
    ) {
        /**
         * 将小程序的API封装成支持Promise的API
         */
        function wxPromisify(fn: (obj: any) => any) {
            return function (obj: any = {}): any {
                return new Promise((resolve, reject) => {
                    obj.success = function (res: any) {
                        resolve(res);
                    };

                    obj.fail = function (res: any) {
                        reject(res);
                    };

                    // 微信jsSdk api有cancel回调
                    obj.cancel = function () {
                        reject({ errMsg: 'request:cancel' });
                    };

                    fn(obj);
                });
            };
        }

        await this.initWeiXinJsSDK({ jsApiList, openTagList });
        const fn = wxPromisify((weixin as any)[name as any] as any);
        const result = await fn(options);
        return result;
    }
}
