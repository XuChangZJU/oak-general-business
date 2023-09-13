export type QiniuUploadInfo = {
    key?: string;
    uploadToken: string;
    uploadHost: string;
    bucket: string;
};

export type AliyunUploadInfo = {
    key?: string;
    signature: string;
    policy: string;
    uploadHost: string;
    bucket: string;
    accessKey: string;
};
