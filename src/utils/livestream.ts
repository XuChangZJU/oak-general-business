import { EntityDict } from '../oak-app-domain';
import { Schema as Livestream } from '../oak-app-domain/Livestream/Schema';
import { Origin, QiniuLiveConfig } from '../types/Config';
import { getConfig } from './getContextConfig';
import { QiniuCloudInstance } from 'oak-external-sdk';
import { assert } from 'oak-domain/lib/utils/assert';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';

/**
 * 创建直播流并生成推拉流地址
 * @param streamTitle 直播流名称
 * @param expireAt 推流过期时间
 * @param context context
 * @returns Livestream 对象
 */
export async function getLivestream<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(
    params: {
        origin: Origin;
        streamTitle: string,
        expireAt: number,
    },
    context: Cxt
): Promise<Pick<Livestream,
    | 'streamTitle'
    | 'hub'
    | 'rtmpPushUrl'
    | 'rtmpPlayUrl'
    | 'pcPushUrl'
    | 'streamKey'
    | 'expireAt'>
> {
    const { streamTitle, expireAt, origin } = params;
    // 获取七牛直播云信息
    const {
        instance,
        config,
    } = await getConfig<ED, Cxt>(context, 'Live', origin);
    assert(origin === 'qiniu');
    const { hub, liveHost, publishDomain, playDomain, playKey, publishKey } = config as QiniuLiveConfig;
    return (instance as QiniuCloudInstance).getLiveStream(hub, 'POST', streamTitle, liveHost, publishDomain, playDomain, publishKey, playKey, expireAt);
}

// 获取推拉流地址
/**
 * 直播流已存在的情况下，获取推拉流地址
 * @param streamTitle 直播流名称
 * @param expireAt 推流过期时间
 * @param context context
 * @returns livestream对象
 */
export async function getStreamObj<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(
    params: {
        origin: Origin;
        streamTitle: string;
        expireAt: number;
    },
    context: Cxt
): Promise<Pick<Livestream,
    | 'streamTitle'
    | 'hub'
    | 'rtmpPushUrl'
    | 'rtmpPlayUrl'
    | 'pcPushUrl'
    | 'streamKey'
    | 'expireAt'>
> {
    const { streamTitle, expireAt, origin } = params;
    const {
        instance,
        config,
    } = await getConfig<ED, Cxt>(context, 'Live', origin);

    assert(origin === 'qiniu');
    const { publishDomain: publishDomain, publishKey: publishKey, playDomain, playKey, hub } = config as QiniuLiveConfig;
    return (instance as QiniuCloudInstance).getStreamObj(publishDomain, playDomain, hub, publishKey, playKey, streamTitle, expireAt);
}

// 生成直播回放
export async function getPlayBackUrl<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(
    params: {
        origin: Origin;
        streamTitle: string;
        start: number;
        end: number;
    },
    context: Cxt
) {
    const { streamTitle, start, end, origin } = params;
    // 获取七牛直播云信息
    const {
        config,
        instance
    } = await getConfig<ED, Cxt>(context, 'Live', origin);
    const { hub, playBackDomain, liveHost } = config as QiniuLiveConfig;
    return (instance as QiniuCloudInstance).getPlayBackUrl(hub, playBackDomain, streamTitle, start, end, 'POST', liveHost);
}