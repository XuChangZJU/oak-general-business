export type QiniuCloudConfig = {
    accessKey: string;
    secretKey: string;
};
export type QiniuLiveConfig = {
    accessKey: string;
    liveHost: string;
    publishDomain: string;
    playDomain: string;
    playBackDomain: string;
    hub: string;
    publishKey: string;
    playKey: string;
};
export type QiniuCosConfig = {
    accessKey: string;
    uploadHost: string;
    bucket: string;
    domain: string;
    protocol: string | string[];
};
export type AmapMapConfig = {
    webApiKey: string;
};
export type AliCloudConfig = {
    accessKeyId: string;
    accessKeySecret: string;
    regionId: string;
    apiVersion: string;
    endpoint: string;
    smsEndpoint: string;
};
export type TencentCloudConfig = {
    secretId: string;
    secretKey: string;
    region: string;
    endpoint: string;
    smsEndpoint: string;
};
export type AmapCloudConfig = {
    webApiKey: string;
};
export type AliSmsConfig = {
    accessKeyId: string;
    defaultSignName: string;
    templates: Record<string, {
        signName?: string;
        code: string;
    }>;
};
export type TencentSmsConfig = {
    secretId: string;
    smsSdkAppId: string;
    defaultSignName: string;
    templates: Record<string, {
        signName?: string;
        code: string;
    }>;
};
export type QrCodeType = 'wechatMpDomainUrl' | 'wechatMpWxaCode' | 'wechatPublic' | 'wechatPublicForMp' | 'webForWechatPublic';
export type Config = {
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
        mockSend?: boolean;
        ali?: AliSmsConfig[];
        tencent?: TencentSmsConfig[];
    };
    App: {
        qrCodeType?: QrCodeType;
        qrCodeApplicationId?: string;
        qrCodePublicForMpId?: string;
        mpShareImageUrl?: string;
        mergeUserDirectly?: boolean;
    };
};
export type Origin = 'ali' | 'tencent' | 'qiniu' | 'amap';
export type Service = 'Map' | 'Cos' | 'Live' | 'Sms';
