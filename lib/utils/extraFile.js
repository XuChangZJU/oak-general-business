"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decomposeFileUrl = exports.composeFileUrl = void 0;
function composeFileUrl(extraFile) {
    const { type, bucket, filename, origin, extra1, objectId, extension, entity } = extraFile;
    if (extra1) {
        // 有extra1就用extra1
        return extra1;
    }
    // 缺少https和域名
    return `${entity}/${objectId}.${extension}`;
}
exports.composeFileUrl = composeFileUrl;
function decomposeFileUrl(url) {
    return {
        origin: 'unknown',
        extra1: url,
        type: 'file',
        filename: '',
        bucket: '',
    };
}
exports.decomposeFileUrl = decomposeFileUrl;
