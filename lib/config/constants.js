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
    captchaSendAt: 'oak-genenral-business:component-changePassword-byMobile-captchaSendAt',
    loginMode: 'oak-genenral-business:component-user-login-loginMode',
    userSearchHistory: 'oak-general-business:page-user-search-history',
    themeState: 'oak-general-business:feature-theme-state',
    appId: 'oak-general-business:feature-application-id',
    token: 'oak-general-business:feature-token-token',
};
