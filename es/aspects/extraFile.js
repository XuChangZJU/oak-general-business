import WechatSDK from 'oak-external-sdk/lib/WechatSDK';
// 请求链接获取标题，发布时间，图片等信息
export async function getInfoByUrl(params) {
    const { url } = params;
    return await WechatSDK.analyzePublicArticle(url);
}
