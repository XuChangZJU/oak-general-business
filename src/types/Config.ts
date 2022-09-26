export type QiniuConfig = {
    accessKey: string;
    secretKey: string;
    uploadHost: string; // 七牛上传域名
    liveHost?: string; // 七牛直播云接口域名
    puhlishDomain?: string; // 推流域名
    playDomain?: string; // 拉流域名
    playBackDomain?: string; // 直播回放存储域名
    hub?: string; // 直播空间名,
    publisthKey?: string; // 直播空间限时鉴权密钥
    playKey?: string; // 拉流密钥
    bucket: string;
    domain: string; // 域名
    protocol: string | string[];
};