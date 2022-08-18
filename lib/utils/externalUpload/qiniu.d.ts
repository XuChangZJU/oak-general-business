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
    getUploadInfo(key: string): Promise<{
        key: string;
        uploadToken: string;
        uploadHost: string;
        bucket: string;
        domain: string;
    }>;
    getToken(scope: string): string;
    base64ToUrlSafe(v: string): string;
    hmacSha1(encodedFlags: any, secretKey: string): string;
    urlSafeBase64Encode(jsonFlags: string): string;
}
