export declare type QiniuCloudConfig = {
    accessKey: string;
    secretKey: string;
};
export declare type QiniuLiveConfig = {
    accessKey: string;
    liveHost: string;
    publishDomain: string;
    playDomain: string;
    playBackDomain: string;
    hub: string;
    publishKey: string;
    playKey: string;
};
export declare type QiniuCosConfig = {
    accessKey: string;
    uploadHost: string;
    bucket: string;
    domain: string;
    protocol: string | string[];
};
export declare type AmapMapConfig = {
    webApiKey: string;
};
export declare type AliCloudConfig = {
    accessKeyId: string;
    accessKeySecret: string;
    regionId: string;
    apiVersion: string;
    endpoint: string;
    smsEndpoint: string;
};
export declare type TencentCloudConfig = {
    secretId: string;
    secretKey: string;
    region: string;
    endpoint: string;
    smsEndpoint: string;
};
export declare type AmapCloudConfig = {
    webApiKey: string;
};
export declare type AliSmsConfig = {
    accessKeyId: string;
    defaultSignName: string;
    templates: Record<string, {
        signName?: string;
        code: string;
    }>;
};
export declare type TencentSmsConfig = {
    secretId: string;
    smsSdkAppId: string;
    defaultSignName: string;
    templates: Record<string, {
        signName?: string;
        code: string;
    }>;
};
export declare type QrCodeType = 'wechatMpDomainUrl' | 'wechatMpWxaCode' | 'wechatPublic' | 'wechatPublicForMp' | 'webForWechatPublic';
export declare type Config = {
    Account?: {
        ali?: AliCloudConfig[];
        tencent?: TencentCloudConfig[];
        qiniu?: QiniuCloudConfig[];
        amap?: AmapCloudConfig[];
    };
    Cos?: {
        qiniu?: QiniuCosConfig;
    };
    Live?: {
        qiniu?: QiniuLiveConfig;
    };
    Map?: {
        amap?: AmapMapConfig;
    };
    Sms?: {
        ali?: AliSmsConfig[];
        tencent?: TencentSmsConfig[];
    };
    App: {
        qrCodeType?: QrCodeType;
        qrCodeApplicationId?: string;
        qrCodePublicForMpId?: string;
        mpShareImageUrl?: string;
    };
};
export declare type Origin = 'ali' | 'tencent' | 'qiniu' | 'amap';
export declare type Service = 'Map' | 'Cos' | 'Live' | 'Sms';
