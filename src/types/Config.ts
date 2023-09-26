export type QiniuCloudConfig = {
    accessKey: string;
    secretKey: string;
};

export type QiniuLiveConfig = {
    accessKey: string;
    liveHost: string; // 七牛直播云接口域名
    publishDomain: string; // 推流域名
    playDomain: string; // 拉流域名
    playBackDomain: string; // 直播回放存储域名
    hub: string; // 直播空间名,
    publishKey: string; // 直播空间限时鉴权密钥
    playKey: string; // 拉流密钥
}

export type QiniuCosConfig = {
    accessKey: string;
    uploadHost: string; // 七牛上传域名
    buckets: {      // 七牛配置的桶信息
        name: string;
        domain: string;
        protocol: string | string[];
    }[];
    defaultBucket: string;      // 默认上传桶
}

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
}

export type AliSmsConfig = {
    accessKeyId: string;
    defaultSignName: string;
    templates: Record<string, {
        signName?: string;
        code: string;       // templateCode
        // templateParams改成function注入
    }>;
};

export type TencentSmsConfig = {
    secretId: string;
    smsSdkAppId: string;
    defaultSignName: string;
    templates: Record<
        string,
        {
            signName?: string;
            code: string;
            // templateParams改成function注入
        }
    >;
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
        qrCodeType?: QrCodeType;            // 生成二维码时，优先生成的类型
        qrCodeApplicationId?: string;       // 生成二维码时，优先使用的appId
        qrCodePublicForMpId?: string;       // 如果qrCodeType是wechatPublicForMp，在此指明关联的小程序appId
        mpShareImageUrl?: string;           // 小程序分享时的imageUrl（使用网络图片，5：4）
        mergeUserDirectly?: boolean;        // 当发现用户具有相同的特征时直接合并
    };
};

export type Origin = 'ali' | 'tencent' | 'qiniu' | 'amap';
export type Service = 'Map' | 'Cos' | 'Live' | 'Sms';