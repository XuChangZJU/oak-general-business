"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfoByUrl = void 0;
const oak_external_sdk_1 = require("oak-external-sdk");
// 请求链接获取标题，发布时间，图片等信息
async function getInfoByUrl(params) {
    const { url } = params;
    return await oak_external_sdk_1.WechatSDK.analyzePublicArticle(url);
}
exports.getInfoByUrl = getInfoByUrl;
