export default class aliyunInstance {
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
    getUploadInfo(fileName: string): Promise<{
        key: string;
        signature: string;
        policy: string;
        uploadHost: string;
        bucket: string;
        domain: string;
        accessKey: string;
    }>;
    getPolicyBase64(timeout?: number): string;
    getSignature(policyBase64: string): string;
    hmacSha1(encodedFlags: any, secretKey: string): string;
    urlSafeBase64Encode(jsonFlags: string): string;
    base64ToUrlSafe(v: string): string;
}
