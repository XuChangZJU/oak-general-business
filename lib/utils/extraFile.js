"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytesToSize = exports.getFileURL = exports.decomposeFileUrl = exports.composeFileUrl = void 0;
function composeFileUrl(extraFile, config, style //图片样式后缀 比如 七牛云支持url带裁剪后缀
) {
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
function bytesToSize(size) {
    var data = '';
    if (size < 0.1 * 1024) {
        //小于0.1KB，则转化成B
        data = size.toFixed(2) + 'B';
    }
    else if (size < 0.1 * 1024 * 1024) {
        // 小于0.1MB，则转化成KB
        data = (size / 1024).toFixed(2) + 'KB';
    }
    else if (size < 0.1 * 1024 * 1024 * 1024) {
        // 小于0.1GB，则转化成MB
        data = (size / (1024 * 1024)).toFixed(2) + 'MB';
    }
    else {
        // 其他转化成GB
        data = (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
    }
    // 转成字符串
    var sizeStr = data + '', 
    // 获取小数点处的索引
    index = sizeStr.indexOf('.'), 
    // 获取小数点后两位的值
    dou = sizeStr.substring(index + 1, 2);
    // 判断后两位是否为00，如果是则删除00
    if (dou == '00')
        return sizeStr.substring(0, index) + sizeStr.substring(index + 3, 2);
    return sizeStr;
}
exports.bytesToSize = bytesToSize;
