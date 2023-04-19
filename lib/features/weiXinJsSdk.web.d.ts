import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../general-app-domain';
import { AspectDict } from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { LocalStorage } from 'oak-frontend-base/lib/features/localStorage';
declare type Options = WeixinJsSdk.CheckJsApiOptions | WeixinJsSdk.AddCardOptions | WeixinJsSdk.ChooseCardOptions | WeixinJsSdk.OnMenuShareTimelineOptions | WeixinJsSdk.OnMenuShareAppMessageOptions | WeixinJsSdk.OnMenuShareQQ | WeixinJsSdk.OnMenuShareWeibo | WeixinJsSdk.OnMenuShareQZone | WeixinJsSdk.ChooseImageOptions | WeixinJsSdk.PreviewImageOptions | WeixinJsSdk.UploadImageOptions | WeixinJsSdk.DownloadImageOptions | WeixinJsSdk.GetLocalImgDataOptions | WeixinJsSdk.LocalVoiceOptions | WeixinJsSdk.UploadVoiceOptions | WeixinJsSdk.DownloadVoiceOptions | WeixinJsSdk.OpenLocationOptions | WeixinJsSdk.GetLocationOptions | WeixinJsSdk.ScanQRCodeOptions | WeixinJsSdk.OpenProductSpecificViewOptions | WeixinJsSdk.ChooseCardOptions | WeixinJsSdk.OpenCardOptions | WeixinJsSdk.ChooseWXPayOptions;
export declare class WeiXinJsSdk<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> extends Feature {
    private cache;
    private storage;
    constructor(cache: Cache<ED, Cxt, FrontCxt, AD>, storage: LocalStorage);
    signatureJsSDK(url: string): Promise<{
        signature: any;
        noncestr: string;
        timestamp: number;
        appId: string;
    }>;
    wxConfig(config: WeixinJsSdk.ConfigOptions): Promise<unknown>;
    initWeiXinJsSDK(options?: {
        jsApiList?: WeixinJsSdk.JSApis[];
        openTagList?: string[];
    }): Promise<unknown>;
    /**
     * 微信jssdk 传入方法名
     */
    loadWeiXinJsSDK(name: WeixinJsSdk.JSApis, options?: Options, jsApiList?: WeixinJsSdk.JSApis[], openTagList?: string[]): Promise<any>;
}
export {};
