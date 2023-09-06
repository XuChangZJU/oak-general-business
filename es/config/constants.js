export let WechatPublicTags = {};
export function registerWechatPublicTags(_WechatPublicTags) {
    WechatPublicTags = _WechatPublicTags;
}
export function getWechatPublicTags() {
    return WechatPublicTags;
}
export const LOCAL_STORAGE_KEYS = {
    captchaSendAt: 'ogb:c-changePassword-byMobile-captchaSendAt',
    loginMode: 'ogb:c-user-login-loginMode',
    userSearchHistory: 'ogb:p-user-search-history',
    themeState: 'ogb:feature-theme-state',
    appId: 'ogb:f-application-id',
    token: 'ogb:f-token-token',
};
