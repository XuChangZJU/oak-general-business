import { QiniuUploadInfo } from 'oak-frontend-base';
export default class qiniuInstance {
    accessKey: string;
    secretKey: string;
    uploadHost: string;
    bucket: string;
    domain: string;
    constructor(config: {
        accessKey: string;
        secretKey: string;
        uploadHost: string;
        bucket: string;
        domain: string;
    });
    getUploadInfo(key?: string): QiniuUploadInfo;
    getToken(scope: string): string;
    base64ToUrlSafe(v: string): string;
    hmacSha1(encodedFlags: any, secretKey: string): string;
    urlSafeBase64Encode(jsonFlags: string): string;
}
