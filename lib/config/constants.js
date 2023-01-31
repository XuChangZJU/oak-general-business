"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWechatPublicTags = exports.registerWechatPublicTags = exports.WechatPublicTags = void 0;
exports.WechatPublicTags = {};
function registerWechatPublicTags(_WechatPublicTags) {
    exports.WechatPublicTags = _WechatPublicTags;
}
exports.registerWechatPublicTags = registerWechatPublicTags;
function getWechatPublicTags() {
    return exports.WechatPublicTags;
}
exports.getWechatPublicTags = getWechatPublicTags;
