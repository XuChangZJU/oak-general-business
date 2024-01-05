import { QiniuZone, CTYunZone } from 'oak-external-sdk';
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
    buckets: {
        zone: QiniuZone;
        name: string;
        domain: string;
        protocol: string | string[];
    }[];
    defaultBucket: string;
};
export type CTYunCosConfig = {
    accessKey: string;
    buckets: {
        zone: CTYunZone;
        name: string;
        domain: string;
        protocol: string | string[];
    }[];
    defaultBucket: string;
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
export type CTYunCloudConfig = {
    accessKey: string;
    securityKey: string;
    smsEndpoint: string;
};
export type AmapCloudConfig = {
    webApiKey: string;
};
export type AliSmsConfig = {
    accessKeyId: string;
    accessKeySecret: string;
    defaultSignName: string;
    apiVersion: string;
    endpoint: string;
};
export type CTYunSmsConfig = {
    accessKey: string;
    securityKey: string;
    defaultSignName: string;
    endpoint: string;
};
export type TencentSmsConfig = {
    secretId: string;
    secretKey: string;
    smsSdkAppId: string;
    region: string;
    defaultSignName: string;
    endpoint: string;
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
        ctyun?: CTYunCloudConfig[];
        amap?: AmapCloudConfig[];
    };
    Cos?: {
        qiniu?: QiniuCosConfig;
        ctyun?: CTYunCosConfig;
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
        ctyun?: CTYunSmsConfig[];
    };
    App: {
        qrCodeType?: QrCodeType;
        qrCodeApplicationId?: string;
        qrCodePublicForMpId?: string;
        mpShareImageUrl?: string;
        mergeUserDirectly?: boolean;
    };
};
export type Origin = 'ali' | 'tencent' | 'qiniu' | 'amap' | 'ctyun';
export type Service = 'Map' | 'Cos' | 'Live' | 'Sms';
