"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var crypto_1 = tslib_1.__importDefault(require("crypto"));
var buffer_1 = require("buffer");
var qiniuInstance = /** @class */ (function () {
    function qiniuInstance(config) {
        var accessKey = config.accessKey, secretKey = config.secretKey, uploadHost = config.uploadHost, bucket = config.bucket, domain = config.domain;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.uploadHost = uploadHost;
        this.bucket = bucket;
        this.domain = domain;
    }
    qiniuInstance.prototype.getUploadInfo = function (key) {
        try {
            var _a = this, uploadHost = _a.uploadHost, domain = _a.domain, bucket = _a.bucket;
            var scope = key ? "".concat(bucket, ":").concat(key) : bucket;
            var uploadToken = this.getToken(scope);
            return {
                key: key,
                uploadToken: uploadToken,
                uploadHost: uploadHost,
                bucket: bucket,
                domain: domain,
            };
        }
        catch (err) {
            throw err;
        }
    };
    qiniuInstance.prototype.getToken = function (scope) {
        // 构造策略
        var putPolicy = {
            scope: scope,
            deadline: 3600 + Math.floor(Date.now() / 1000),
        };
        // 构造凭证
        var encodedFlags = this.urlSafeBase64Encode(JSON.stringify(putPolicy));
        var encoded = this.hmacSha1(encodedFlags, this.secretKey);
        var encodedSign = this.base64ToUrlSafe(encoded);
        var uploadToken = this.accessKey + ':' + encodedSign + ':' + encodedFlags;
        return uploadToken;
    };
    qiniuInstance.prototype.base64ToUrlSafe = function (v) {
        return v.replace(/\//g, '_').replace(/\+/g, '-');
    };
    qiniuInstance.prototype.hmacSha1 = function (encodedFlags, secretKey) {
        var hmac = crypto_1.default.createHmac('sha1', secretKey);
        hmac.update(encodedFlags);
        return hmac.digest('base64');
    };
    qiniuInstance.prototype.urlSafeBase64Encode = function (jsonFlags) {
        var encoded = buffer_1.Buffer.from(jsonFlags).toString('base64');
        return this.base64ToUrlSafe(encoded);
    };
    return qiniuInstance;
}());
exports.default = qiniuInstance;
