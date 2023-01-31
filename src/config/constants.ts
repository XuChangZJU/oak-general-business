export let WechatPublicTags: Record<string, string> = {};

export function registerWechatPublicTags(_WechatPublicTags: Record<string, string>) {
    WechatPublicTags = _WechatPublicTags;
}

export function getWechatPublicTags() {
    return WechatPublicTags;
}