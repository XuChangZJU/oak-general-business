"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decomposeFileUrl = exports.composeFileUrl = void 0;
function composeFileUrl(extraFile, systemConfig) {
    const { type, bucket, filename, origin, extra1, objectId, extension, entity } = extraFile;
    console.log(extraFile);
    if (extra1) {
        // 有extra1就用extra1
        return extra1;
    }
    if (systemConfig && systemConfig.Cos) {
        const { domain, protocol } = systemConfig.Cos[origin];
        let protocol2 = protocol;
        if (protocol instanceof Array) {
            // protocol存在https 说明域名有证书
            const index = protocol.includes('https')
                ? protocol.findIndex((ele) => ele === 'https')
                : 0;
            protocol2 = protocol[index];
        }
        return `${protocol2}://${domain}/${entity}/${objectId}.${extension}`;
    }
    return '';
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
