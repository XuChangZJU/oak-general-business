"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileURL = exports.decomposeFileUrl = exports.composeFileUrl = void 0;
function composeFileUrl(extraFile, systemConfig) {
    var type = extraFile.type, bucket = extraFile.bucket, filename = extraFile.filename, origin = extraFile.origin, extra1 = extraFile.extra1, objectId = extraFile.objectId, extension = extraFile.extension, entity = extraFile.entity;
    if (extra1) {
        // 有extra1就用extra1 可能File对象
        if (typeof extra1 === 'string') {
            return extra1;
        }
        if (extra1 instanceof File) {
            return getFileURL(extra1);
        }
        return extra1;
    }
    if (systemConfig && systemConfig.Cos) {
        var _a = systemConfig.Cos[origin], domain = _a.domain, protocol = _a.protocol;
        var protocol2 = protocol;
        if (protocol instanceof Array) {
            // protocol存在https 说明域名有证书
            var index = protocol.includes('https')
                ? protocol.findIndex(function (ele) { return ele === 'https'; })
                : 0;
            protocol2 = protocol[index];
        }
        return "".concat(protocol2, "://").concat(domain, "/").concat(entity, "/").concat(objectId, ".").concat(extension);
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
//获取file文件url
function getFileURL(file) {
    var getUrl = null;
    // @ts-ignore
    if (window.createObjectURL !== undefined) {
        // basic
        // @ts-ignore
        getUrl = window.createObjectURL(file);
    }
    else if (window.URL !== undefined) {
        // mozilla(firefox)
        getUrl = window.URL.createObjectURL(file);
    }
    else if (window.webkitURL !== undefined) {
        // webkit or chrome
        getUrl = window.webkitURL.createObjectURL(file);
    }
    return getUrl;
}
exports.getFileURL = getFileURL;
