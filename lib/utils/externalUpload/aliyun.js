"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var crypto_1 = tslib_1.__importDefault(require("crypto"));
var buffer_1 = require("buffer");
var aliyunInstance = /** @class */ (function () {
    function aliyunInstance(config) {
        var accessKey = config.accessKey, secretKey = config.secretKey, uploadHost = config.uploadHost, bucket = config.bucket, domain = config.domain;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.uploadHost = uploadHost;
        this.bucket = bucket;
        this.domain = domain;
    }
    aliyunInstance.prototype.getUploadInfo = function (key) {
        try {
            var _a = this, uploadHost = _a.uploadHost, domain = _a.domain, bucket = _a.bucket, accessKey = _a.accessKey;
            var policy = this.getPolicyBase64();
            var signature = this.getSignature(policy);
            return {
                key: key,
                signature: signature,
                policy: policy,
                uploadHost: uploadHost,
                bucket: bucket,
                domain: domain,
                accessKey: accessKey,
            };
        }
        catch (err) {
            throw err;
        }
    };
    aliyunInstance.prototype.getPolicyBase64 = function (timeout) {
        if (timeout === void 0) { timeout = 8000; }
        var date = new Date();
        date.setHours(date.getHours() + timeout);
        var policyText = {
            expiration: date.toISOString(),
            conditions: [
                ['content-length-range', 0, 5 * 1024 * 1024], // 设置上传文件的大小限制,5mb
            ],
        };
        var policyBase64 = this.urlSafeBase64Encode(JSON.stringify(policyText));
        return policyBase64;
    };
    aliyunInstance.prototype.getSignature = function (policyBase64) {
        var encoded = this.hmacSha1(policyBase64, this.secretKey);
        ;
        var signature = this.base64ToUrlSafe(encoded);
        return signature;
    };
    aliyunInstance.prototype.hmacSha1 = function (encodedFlags, secretKey) {
        var hmac = crypto_1.default.createHmac('sha1', secretKey);
        hmac.update(encodedFlags);
        return hmac.digest('base64');
    };
    aliyunInstance.prototype.urlSafeBase64Encode = function (jsonFlags) {
        var encoded = buffer_1.Buffer.from(jsonFlags).toString('base64');
        return this.base64ToUrlSafe(encoded);
    };
    aliyunInstance.prototype.base64ToUrlSafe = function (v) {
        return v.replace(/\//g, '_').replace(/\+/g, '-');
    };
    return aliyunInstance;
}());
exports.default = aliyunInstance;
