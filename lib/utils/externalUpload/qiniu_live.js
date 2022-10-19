"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sign_1 = require("../sign");
var QiniuLiveInstance = /** @class */ (function () {
    function QiniuLiveInstance(config) {
        var accessKey = config.accessKey, secretKey = config.secretKey, host = config.host, method = config.method, path = config.path, rawQuery = config.rawQuery, contentType = config.contentType, bodyStr = config.bodyStr, contentLength = config.contentLength;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.host = host;
        this.method = method;
        this.path = path;
        this.rawQuery = rawQuery;
        this.contentType = contentType;
        this.bodyStr = bodyStr;
        this.contentLength = contentLength;
    }
    QiniuLiveInstance.prototype.getToken = function () {
        var _a = this, method = _a.method, path = _a.path, rawQuery = _a.rawQuery, host = _a.host, contentType = _a.contentType, contentLength = _a.contentLength, bodyStr = _a.bodyStr, accessKey = _a.accessKey, secretKey = _a.secretKey;
        // 1. 添加 Path
        var data = "".concat(method, " ").concat(path);
        if (rawQuery) {
            data += "?".concat(rawQuery);
        }
        data += "\nHost: ".concat(host);
        if (contentType) {
            data += "\nContent-Type: ".concat(contentType);
        }
        data += "\n\n";
        if (bodyStr && contentType && contentType !== "application/octet-stream") {
            data += bodyStr;
        }
        console.log('data', data);
        var sign = (0, sign_1.hmacSha1)(data, secretKey);
        var encodedSign = (0, sign_1.base64ToUrlSafe)(sign);
        var toke = "Qiniu " + accessKey + ":" + encodedSign;
        return toke;
    };
    return QiniuLiveInstance;
}());
exports.default = QiniuLiveInstance;
