import crypto from 'crypto';
import { Buffer } from 'buffer';
export function base64ToUrlSafe(v) {
    return v.replace(/\//g, '_').replace(/\+/g, '-');
}
export function hmacSha1(encodedFlags, secretKey) {
    const hmac = crypto.createHmac('sha1', secretKey);
    hmac.update(encodedFlags);
    return hmac.digest('base64');
}
export function urlSafeBase64Encode(jsonFlags) {
    const encoded = Buffer.from(jsonFlags).toString('base64');
    return base64ToUrlSafe(encoded);
}
