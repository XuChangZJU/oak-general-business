"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const buffer_1 = require("buffer");
class qiniuInstance {
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
    async getUploadInfo(fileName) {
        try {
            const { uploadHost, domain, bucket } = this;
            const key = `${Date.now()}/${fileName}`;
            const scope = `${bucket}:${key}`;
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
        const hmac = crypto_1.default.createHmac('sha1', secretKey);
        hmac.update(encodedFlags);
        return hmac.digest('base64');
    }
    urlSafeBase64Encode(jsonFlags) {
        const encoded = buffer_1.Buffer.from(jsonFlags).toString('base64');
        return this.base64ToUrlSafe(encoded);
    }
}
exports.default = qiniuInstance;
