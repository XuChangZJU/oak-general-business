import { base64ToUrlSafe, hmacSha1 } from '../sign';
export default class QiniuLiveInstance {
    accessKey;
    secretKey;
    host; // 请求域名，
    method;
    path; // 请求路径 实际的请求路径详见各七牛直播云接口说明的请求包
    rawQuery;
    contentType;
    contentLength;
    bodyStr;
    constructor(config) {
        const { accessKey, secretKey, host, method, path, rawQuery, contentType, bodyStr, contentLength } = config;
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
    getToken() {
        const { method, path, rawQuery, host, contentType, contentLength, bodyStr, accessKey, secretKey } = this;
        // 1. 添加 Path
        let data = `${method} ${path}`;
        if (rawQuery) {
            data += `?${rawQuery}`;
        }
        data += `\nHost: ${host}`;
        if (contentType) {
            data += `\nContent-Type: ${contentType}`;
        }
        data += "\n\n";
        if (bodyStr && contentType && contentType !== "application/octet-stream") {
            data += bodyStr;
        }
        console.log('data', data);
        const sign = hmacSha1(data, secretKey);
        const encodedSign = base64ToUrlSafe(sign);
        const toke = "Qiniu " + accessKey + ":" + encodedSign;
        return toke;
    }
}
