"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfoByUrl = void 0;
const tslib_1 = require("tslib");
const WechatSDK_1 = tslib_1.__importDefault(require("oak-external-sdk/lib/WechatSDK"));
// 请求链接获取标题，发布时间，图片等信息
async function getInfoByUrl(params) {
    const { url } = params;
    return await WechatSDK_1.default.analyzePublicArticle(url);
}
exports.getInfoByUrl = getInfoByUrl;
