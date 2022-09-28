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
    bucket: string;
    domain: string; // 域名
    protocol: string | string[];
}

export type AliCloudConfig = {
    accessKeyId: string;
    accessKeySecret: string;
    regionId: string;
};

export type TencentCloudConfig = {
    secretId: string;
    secretKey: string;
    region: string;
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
        params: string[];   // templateParams中的key值(和messageType中的参数位置对应)
    }>;
};

export type TencentSmsConfig = {
    secretId: string;
    defaultSignName: string;
    templates: Record<string, {
        signName?: string;
        code: string;
    }>;
};



export type Config = {
    Account?: {
        ali?: AliCloudConfig[];
        tencent?: TencentCloudConfig[];
        qiniu?: QiniuCloudConfig[];
        amap?: AmapCloudConfig[];
    },
    Cos?: {
        qiniu?: QiniuCosConfig;
    };
    Live?: {
        qiniu?: QiniuLiveConfig;
    },
    Map?: {
        amap?: {
            webApiKey: string;
        };
    };
    UserEntityGrant?: {
        lifetimeLength: number; // 授权的过期时间（ms）
    };
    Sms?: {
        ali?: AliSmsConfig[];
        tencent?: TencentSmsConfig[];
    }
};

export type Origin = 'ali' | 'tencent' | 'qiniu' | 'amap';
export type Service = 'Map' | 'Cos' | 'Live' | 'Sms';