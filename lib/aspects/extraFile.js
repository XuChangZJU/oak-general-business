"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploadInfo = void 0;
var tslib_1 = require("tslib");
var getContextConfig_1 = require("../utils/getContextConfig");
var assert_1 = require("oak-domain/lib/utils/assert");
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
