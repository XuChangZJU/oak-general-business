"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOCAL_STORAGE_KEYS = exports.getWechatPublicTags = exports.registerWechatPublicTags = exports.WechatPublicTags = void 0;
exports.WechatPublicTags = {};
function registerWechatPublicTags(_WechatPublicTags) {
    exports.WechatPublicTags = _WechatPublicTags;
}
exports.registerWechatPublicTags = registerWechatPublicTags;
function getWechatPublicTags() {
    return exports.WechatPublicTags;
}
exports.getWechatPublicTags = getWechatPublicTags;
exports.LOCAL_STORAGE_KEYS = {
    captchaSendAt: 'ogb:c-changePassword-byMobile-captchaSendAt',
    loginMode: 'ogb:c-user-login-loginMode',
    userSearchHistory: 'ogb:p-user-search-history',
    themeState: 'ogb:feature-theme-state',
    appId: 'ogb:f-application-id',
    token: 'ogb:f-token-token',
};
