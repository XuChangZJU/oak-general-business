export let WechatPublicTags: Record<string, string> = {};

export function registerWechatPublicTags(_WechatPublicTags: Record<string, string>) {
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

export const DATA_SUBSCRIBER_KEYS = {
    sessionMessageList: 'sessionM-l',
};