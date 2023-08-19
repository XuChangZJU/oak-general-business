export let WechatPublicTags: Record<string, string> = {};

export function registerWechatPublicTags(_WechatPublicTags: Record<string, string>) {
    WechatPublicTags = _WechatPublicTags;
}

export function getWechatPublicTags() {
    return WechatPublicTags;
}

export const LOCAL_STORAGE_KEYS = {
    captchaSendAt: 'oak-genenral-business:component-changePassword-byMobile-captchaSendAt',
    loginMode: 'oak-genenral-business:component-user-login-loginMode',
    userSearchHistory: 'oak-general-business:page-user-search-history',
    themeState: 'oak-general-business:feature-theme-state',
    appId: 'oak-general-business:feature-application-id',
    token: 'oak-general-business:feature-token-token',
};