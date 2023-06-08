"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfoByUrl = exports.getUploadInfo = void 0;
var tslib_1 = require("tslib");
var getContextConfig_1 = require("../utils/getContextConfig");
var assert_1 = require("oak-domain/lib/utils/assert");
var oak_external_sdk_1 = require("oak-external-sdk");
function getUploadInfo(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var origin, key, bucket, _a, instance, config, _b, uploadHost, domain, bucket2;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    origin = params.origin, key = params.key, bucket = params.bucket;
                    return [4 /*yield*/, (0, getContextConfig_1.getConfig)(context, 'Cos', origin)];
                case 1:
                    _a = _c.sent(), instance = _a.instance, config = _a.config;
                    (0, assert_1.assert)(origin === 'qiniu');
                    _b = config, uploadHost = _b.uploadHost, domain = _b.domain, bucket2 = _b.bucket;
                    return [2 /*return*/, instance.getUploadInfo(uploadHost, domain, bucket || bucket2, key)];
            }
        });
    });
}
exports.getUploadInfo = getUploadInfo;
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
