"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const buffer_1 = require("buffer");
class aliyunInstance {
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
    async getUploadInfo(fileName) {
        try {
            const { uploadHost, domain, bucket, accessKey } = this;
            const key = `${Date.now()}/${fileName}`;
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
        const hmac = crypto_1.default.createHmac('sha1', secretKey);
        hmac.update(encodedFlags);
        return hmac.digest('base64');
    }
    urlSafeBase64Encode(jsonFlags) {
        const encoded = buffer_1.Buffer.from(jsonFlags).toString('base64');
        return this.base64ToUrlSafe(encoded);
    }
    base64ToUrlSafe(v) {
        return v.replace(/\//g, '_').replace(/\+/g, '-');
    }
}
exports.default = aliyunInstance;
