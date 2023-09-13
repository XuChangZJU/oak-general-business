"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var getContextConfig_1 = require("../../utils/getContextConfig");
var lodash_1 = require("oak-domain/lib/utils/lodash");
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
                            uploadMeta: instance.getUploadInfo(uploadHost, bucket || bucket2, key)
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
                        return [4 /*yield*/, uploadFn('', (0, lodash_1.get)(extraFile, 'uploadMeta.uploadHost', ''), {
                                key: uploadMeta === null || uploadMeta === void 0 ? void 0 : uploadMeta.key,
                                token: uploadMeta === null || uploadMeta === void 0 ? void 0 : uploadMeta.uploadToken,
                            }, true, file)];
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
    Qiniu.prototype.checkWhetherSuccess = function (extraFile, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uploadMeta, bucket, key, qiniuSearchUrl;
            return tslib_1.__generator(this, function (_a) {
                uploadMeta = extraFile.uploadMeta, bucket = extraFile.bucket;
                key = uploadMeta.key;
                qiniuSearchUrl = QiniuSearchUrl.replace('EncodedEntryURI', "".concat(bucket, ":").concat(key));
                return [2 /*return*/, false];
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
