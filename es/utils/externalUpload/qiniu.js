import crypto from 'crypto';
import { Buffer } from 'buffer';
export default class qiniuInstance {
    accessKey;
    secretKey;
    uploadHost; //七牛上传url
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
            const { uploadHost, domain, bucket } = this;
            const scope = key ? `${bucket}:${key}` : bucket;
            const uploadToken = this.getToken(scope);
            return {
                key,
                uploadToken,
                uploadHost,
                bucket,
                domain,
            };
        }
        catch (err) {
            throw err;
        }
    }
    getToken(scope) {
        // 构造策略
        const putPolicy = {
            scope: scope,
            deadline: 3600 + Math.floor(Date.now() / 1000),
        };
        // 构造凭证
        const encodedFlags = this.urlSafeBase64Encode(JSON.stringify(putPolicy));
        const encoded = this.hmacSha1(encodedFlags, this.secretKey);
        const encodedSign = this.base64ToUrlSafe(encoded);
        const uploadToken = this.accessKey + ':' + encodedSign + ':' + encodedFlags;
        return uploadToken;
    }
    base64ToUrlSafe(v) {
        return v.replace(/\//g, '_').replace(/\+/g, '-');
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
}
