import { Feature } from 'oak-frontend-base';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../oak-app-domain';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { LocalStorage } from 'oak-frontend-base/es/features/localStorage';
import { Environment } from 'oak-frontend-base/es/features/environment';
import wx from 'weixin-js-sdk';
type ConfigOptions = {
    debug?: boolean;
    appId: string;
    timestamp: number;
    nonceStr: string;
    signature: string;
    jsApiList?: wx.jsApiList;
    openTagList?: wx.openTagList;
};
type ParamOptions = wx.IcheckJsApi | wx.IaddCard | wx.IchooseCard | wx.IonMenuShareTimeline | wx.IonMenuShareAppMessage | wx.IonMenuShareQQ | wx.IonMenuShareWeibo | wx.IonMenuShareQZone | wx.IchooseImage | wx.IpreviewImage | wx.IuploadImage | wx.IdownloadImage | wx.IgetLocalImgData | wx.IplaypausestopVoice | wx.IupdownloadVoice | wx.IopenLocation | wx.IgetLocation | wx.IscanQRCode | wx.IopenProductSpecificView | wx.IchooseCard | wx.IopenCard | wx.IchooseWXPay;
export declare class WeiXinJsSdk<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> extends Feature {
    private cache;
    private storage;
    private environment;
    private landingUrl?;
    constructor(cache: Cache<ED, Cxt, FrontCxt, AD>, storage: LocalStorage, environment: Environment);
    signatureJsSDK(url: string): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["signatureJsSDK"]>>;
    getConfig(config: ConfigOptions): Promise<unknown>;
    setLandingUrl(url?: string): void;
    init(options?: {
        jsApiList?: wx.jsApiList;
        openTagList?: wx.openTagList;
    }): Promise<unknown>;
    /**
     * 微信jssdk 传入方法名
     */
    loadWxAPi(name: wx.ApiMethod, options?: ParamOptions, jsApiList?: wx.jsApiList, openTagList?: wx.openTagList): Promise<object>;
}
export {};
