"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlSafeBase64Encode = exports.hmacSha1 = exports.base64ToUrlSafe = void 0;
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const buffer_1 = require("buffer");
function base64ToUrlSafe(v) {
    return v.replace(/\//g, '_').replace(/\+/g, '-');
}
exports.base64ToUrlSafe = base64ToUrlSafe;
function hmacSha1(encodedFlags, secretKey) {
    const hmac = crypto_1.default.createHmac('sha1', secretKey);
    hmac.update(encodedFlags);
    return hmac.digest('base64');
}
exports.hmacSha1 = hmacSha1;
function urlSafeBase64Encode(jsonFlags) {
    const encoded = buffer_1.Buffer.from(jsonFlags).toString('base64');
    return base64ToUrlSafe(encoded);
}
exports.urlSafeBase64Encode = urlSafeBase64Encode;
