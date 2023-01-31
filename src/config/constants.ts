export let WechatPublicTags: Record<string, string> = {};

export function registerWechatPublicTags(_WechatPublicTags: Record<string, string>) {
    WechatPublicTags = _WechatPublicTags;
}
