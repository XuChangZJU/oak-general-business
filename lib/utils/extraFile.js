"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytesToSize = exports.getFileURL = exports.decomposeFileUrl = exports.composeFileUrl = void 0;
function composeFileUrl(extraFile, config, style) {
    var _a = extraFile || {}, type = _a.type, bucket = _a.bucket, filename = _a.filename, origin = _a.origin, extra1 = _a.extra1, objectId = _a.objectId, extension = _a.extension, entity = _a.entity;
    if (extra1) {
        // 有extra1就用extra1 可能File对象 可能外部链接
        if (typeof extra1 === 'string') {
            return extra1;
        }
        if (extra1 instanceof File) {
            return getFileURL(extra1) || '';
        }
        return extra1 || '';
    }
    if (config && config.Cos) {
        var _b = config.Cos[origin], domain = _b.domain, protocol = _b.protocol;
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
function bytesToSize(sizes) {
    var mYsize = sizes;
    if (mYsize === 0)
        return 0 + 'B';
    if (mYsize < 0.1) { // 小于0.1KB转换为B
        mYsize = parseFloat((mYsize * 1024).toFixed(2)) + 'B';
    }
    else if (mYsize > (0.1 * 1024)) { // 大于0.1MB转换为MB
        mYsize = parseFloat((mYsize / 1024).toFixed(2)) + 'MB';
    }
    else if (mYsize > (0.1 * 1024 * 1024)) { // 大于0.1GB转换为GB
        mYsize = parseFloat((mYsize / 1024 / 1024).toFixed(2)) + 'GB';
    }
    else {
        mYsize = (mYsize).toFixed(2) + 'KB';
    }
    return mYsize;
}
exports.bytesToSize = bytesToSize;
