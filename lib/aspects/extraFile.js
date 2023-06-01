"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImgsByUrl = exports.getUploadInfo = void 0;
var tslib_1 = require("tslib");
var getContextConfig_1 = require("../utils/getContextConfig");
var assert_1 = require("oak-domain/lib/utils/assert");
var node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
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
function getImgsByUrl(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var url, imgs, response, html, regex, matches, matches_1, matches_1_1, match;
        var e_1, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = params.url;
                    imgs = [];
                    return [4 /*yield*/, (0, node_fetch_1.default)(url)];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.text()];
                case 2:
                    html = _b.sent();
                    regex = /<img.*?src="(.*?)"/g;
                    matches = html.matchAll(regex);
                    try {
                        for (matches_1 = tslib_1.__values(matches), matches_1_1 = matches_1.next(); !matches_1_1.done; matches_1_1 = matches_1.next()) {
                            match = matches_1_1.value;
                            // 不是链接的不要
                            if (match[1].includes('https://') || match.includes('http://')) {
                                imgs.push(match[1]);
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (matches_1_1 && !matches_1_1.done && (_a = matches_1.return)) _a.call(matches_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return [2 /*return*/, imgs];
            }
        });
    });
}
exports.getImgsByUrl = getImgsByUrl;
