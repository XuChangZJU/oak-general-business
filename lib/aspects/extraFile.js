"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfoByUrl = exports.upload = exports.getUploadInfo = void 0;
var tslib_1 = require("tslib");
var getContextConfig_1 = require("../utils/getContextConfig");
var assert_1 = require("oak-domain/lib/utils/assert");
var oak_external_sdk_1 = require("oak-external-sdk");
function getUploadInfo(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, origin, extra1, filename, objectId, extension, entity, bucket, key, _b, instance, config, _c, uploadHost, domain, bucket2;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = params.extraFile, origin = _a.origin, extra1 = _a.extra1, filename = _a.filename, objectId = _a.objectId, extension = _a.extension, entity = _a.entity, bucket = _a.bucket;
                    key = "".concat(entity ? entity + '/' : '').concat(objectId).concat(extension ? '.' + extension : '');
                    (0, assert_1.assert)(origin && origin !== 'unknown');
                    return [4 /*yield*/, (0, getContextConfig_1.getConfig)(context, 'Cos', origin)];
                case 1:
                    _b = _d.sent(), instance = _b.instance, config = _b.config;
                    (0, assert_1.assert)(origin === 'qiniu');
                    _c = config, uploadHost = _c.uploadHost, domain = _c.domain, bucket2 = _c.bucket;
                    return [2 /*return*/, instance.getUploadInfo(uploadHost, domain, bucket || bucket2, key)];
            }
        });
    });
}
exports.getUploadInfo = getUploadInfo;
function upload(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, origin, extra1, filename, objectId, extension, entity, bucket, key, _b, instance, config, _c, uploadHost, domain, bucket2;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = params.extraFile, origin = _a.origin, extra1 = _a.extra1, filename = _a.filename, objectId = _a.objectId, extension = _a.extension, entity = _a.entity, bucket = _a.bucket;
                    key = "".concat(entity ? entity + '/' : '').concat(objectId).concat(extension ? '.' + extension : '');
                    (0, assert_1.assert)(origin && origin !== 'unknown');
                    return [4 /*yield*/, (0, getContextConfig_1.getConfig)(context, 'Cos', origin)];
                case 1:
                    _b = _d.sent(), instance = _b.instance, config = _b.config;
                    (0, assert_1.assert)(origin === 'qiniu');
                    _c = config, uploadHost = _c.uploadHost, domain = _c.domain, bucket2 = _c.bucket;
                    return [2 /*return*/, instance.getUploadInfo(uploadHost, domain, bucket || bucket2, key)];
            }
        });
    });
}
exports.upload = upload;
// 请求链接获取标题，发布时间，图片等信息
function getInfoByUrl(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var url;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = params.url;
                    return [4 /*yield*/, oak_external_sdk_1.WechatSDK.analyzePublicArticle(url)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getInfoByUrl = getInfoByUrl;
