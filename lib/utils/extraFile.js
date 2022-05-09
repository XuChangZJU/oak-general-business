"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decomposeFileUrl = exports.composeFileUrl = void 0;
function composeFileUrl(extraFile) {
    const { type, bucket, filename, origin, extra1 } = extraFile;
    if (origin === 'unknown') {
        // 未知第三方源
        return extra1;
    }
    throw new Error('not implemented yet');
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
