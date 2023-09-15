"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var getContextConfig_1 = require("../../utils/getContextConfig");
var sign_1 = require("../sign");
var QiniuSearchUrl = 'https://rs.qiniuapi.com/stat/EncodedEntryURI';
var Qiniu = /** @class */ (function () {
    function Qiniu() {
        this.name = 'qiniu';
    }
    Qiniu.prototype.formUploadMeta = function (extraFile, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var origin, objectId, extension, entity, bucket, key, _a, instance, config, _b, uploadHost, bucket2;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        origin = extraFile.origin, objectId = extraFile.objectId, extension = extraFile.extension, entity = extraFile.entity, bucket = extraFile.bucket;
                        key = "".concat(entity ? entity + '/' : '').concat(objectId).concat(extension ? '.' + extension : '');
                        return [4 /*yield*/, (0, getContextConfig_1.getConfig)(context, 'Cos', 'qiniu')];
                    case 1:
                        _a = _c.sent(), instance = _a.instance, config = _a.config;
                        _b = config, uploadHost = _b.uploadHost, bucket2 = _b.bucket;
                        Object.assign(extraFile, {
                            bucket: bucket || bucket2,
                            uploadMeta: instance.getUploadInfo(uploadHost, bucket || bucket2, key),
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Qiniu.prototype.upload = function (extraFile, uploadFn, file) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uploadMeta, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploadMeta = extraFile.uploadMeta;
                        return [4 /*yield*/, uploadFn(file, 'file', uploadMeta.uploadHost, {
                                key: uploadMeta.key,
                                token: uploadMeta.uploadToken,
                            }, true)];
                    case 1:
                        result = _a.sent();
                        if (result.success === true || result.key) {
                            return [2 /*return*/];
                        }
                        throw new Error('图片上传失败');
                }
            });
        });
    };
    Qiniu.prototype.composeFileUrl = function (extraFile, config, style) {
        var _a = extraFile || {}, objectId = _a.objectId, extension = _a.extension, entity = _a.entity;
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
    };
    Qiniu.prototype.checkWhetherSuccess = function (extraFile, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uploadMeta, bucket, key, entry, encodedEntryURI, qiniuSearchUrl, _a, instance, config;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        uploadMeta = extraFile.uploadMeta, bucket = extraFile.bucket;
                        key = uploadMeta.key;
                        entry = "".concat(bucket, ":").concat(key);
                        encodedEntryURI = (0, sign_1.urlSafeBase64Encode)(entry);
                        qiniuSearchUrl = QiniuSearchUrl.replace('EncodedEntryURI', encodedEntryURI);
                        return [4 /*yield*/, (0, getContextConfig_1.getConfig)(context, 'Cos', 'qiniu')];
                    case 1:
                        _a = _b.sent(), instance = _a.instance, config = _a.config;
                        return [2 /*return*/, false];
                }
            });
        });
    };
    Qiniu.prototype.removeFile = function (extraFile, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bucket, uploadMeta;
            return tslib_1.__generator(this, function (_a) {
                bucket = extraFile.bucket, uploadMeta = extraFile.uploadMeta;
                return [2 /*return*/];
            });
        });
    };
    return Qiniu;
}());
exports.default = Qiniu;
;
