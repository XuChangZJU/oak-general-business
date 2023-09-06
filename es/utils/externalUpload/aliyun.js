import crypto from 'crypto';
import { Buffer } from 'buffer';
export default class aliyunInstance {
    accessKey;
    secretKey;
    uploadHost; //阿里云上传url
    bucket;
    domain;
    constructor(config) {
        const { accessKey, secretKey, uploadHost, bucket, domain } = config;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.uploadHost = uploadHost;
        this.bucket = bucket;
        this.domain = domain;
    }
    getUploadInfo(key) {
        try {
            const { uploadHost, domain, bucket, accessKey } = this;
            const policy = this.getPolicyBase64();
            const signature = this.getSignature(policy);
            return {
                key,
                signature,
                policy,
                uploadHost,
                bucket,
                domain,
                accessKey,
            };
        }
        catch (err) {
            throw err;
        }
    }
    getPolicyBase64(timeout = 8000) {
        const date = new Date();
        date.setHours(date.getHours() + timeout);
        const policyText = {
            expiration: date.toISOString(),
            conditions: [
                ['content-length-range', 0, 5 * 1024 * 1024], // 设置上传文件的大小限制,5mb
            ],
        };
        const policyBase64 = this.urlSafeBase64Encode(JSON.stringify(policyText));
        return policyBase64;
    }
    getSignature(policyBase64) {
        const encoded = this.hmacSha1(policyBase64, this.secretKey);
        ;
        const signature = this.base64ToUrlSafe(encoded);
        return signature;
    }
    hmacSha1(encodedFlags, secretKey) {
        const hmac = crypto.createHmac('sha1', secretKey);
        hmac.update(encodedFlags);
        return hmac.digest('base64');
    }
    urlSafeBase64Encode(jsonFlags) {
        const encoded = Buffer.from(jsonFlags).toString('base64');
        return this.base64ToUrlSafe(encoded);
    }
    base64ToUrlSafe(v) {
        return v.replace(/\//g, '_').replace(/\+/g, '-');
    }
}
