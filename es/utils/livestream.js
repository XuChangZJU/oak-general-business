import { assert } from 'oak-domain/lib/utils/assert';
import { getConfig } from './getContextConfig';
/**
 * 创建直播流并生成推拉流地址
 * @param streamTitle 直播流名称
 * @param expireAt 推流过期时间
 * @param context context
 * @returns Livestream 对象
 */
export async function getLivestream(params, context) {
    const { streamTitle, expireAt, origin } = params;
    // 获取七牛直播云信息
    const { instance, config, } = await getConfig(context, 'Live', origin);
    assert(origin === 'qiniu');
    const { hub, liveHost, publishDomain, playDomain, playKey, publishKey } = config;
    return instance.getLiveStream(hub, 'POST', streamTitle, liveHost, publishDomain, playDomain, publishKey, playKey, expireAt);
}
// 获取推拉流地址
/**
 * 直播流已存在的情况下，获取推拉流地址
 * @param streamTitle 直播流名称
 * @param expireAt 推流过期时间
 * @param context context
 * @returns livestream对象
 */
export async function getStreamObj(params, context) {
    const { streamTitle, expireAt, origin } = params;
    const { instance, config, } = await getConfig(context, 'Live', origin);
    assert(origin === 'qiniu');
    const { publishDomain: publishDomain, publishKey: publishKey, playDomain, playKey, hub } = config;
    return instance.getStreamObj(publishDomain, playDomain, hub, publishKey, playKey, streamTitle, expireAt);
}
// 生成直播回放
export async function getPlayBackUrl(params, context) {
    const { streamTitle, start, end, origin } = params;
    // 获取七牛直播云信息
    const { config, instance } = await getConfig(context, 'Live', origin);
    const { hub, playBackDomain, liveHost } = config;
    return instance.getPlayBackUrl(hub, playBackDomain, streamTitle, start, end, 'POST', liveHost);
}
