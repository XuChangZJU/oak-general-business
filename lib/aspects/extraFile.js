"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfoByUrl = void 0;
var tslib_1 = require("tslib");
var oak_external_sdk_1 = require("oak-external-sdk");
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
