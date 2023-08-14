import { EntityDict } from '../oak-app-domain';
import { Schema as Livestream } from '../oak-app-domain/Livestream/Schema';
import { Origin } from '../types/Config';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
/**
 * 创建直播流并生成推拉流地址
 * @param streamTitle 直播流名称
 * @param expireAt 推流过期时间
 * @param context context
 * @returns Livestream 对象
 */
export declare function getLivestream<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    origin: Origin;
    streamTitle: string;
    expireAt: number;
}, context: Cxt): Promise<Pick<Livestream, 'streamTitle' | 'hub' | 'rtmpPushUrl' | 'rtmpPlayUrl' | 'pcPushUrl' | 'streamKey' | 'expireAt'>>;
/**
 * 直播流已存在的情况下，获取推拉流地址
 * @param streamTitle 直播流名称
 * @param expireAt 推流过期时间
 * @param context context
 * @returns livestream对象
 */
export declare function getStreamObj<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    origin: Origin;
    streamTitle: string;
    expireAt: number;
}, context: Cxt): Promise<Pick<Livestream, 'streamTitle' | 'hub' | 'rtmpPushUrl' | 'rtmpPlayUrl' | 'pcPushUrl' | 'streamKey' | 'expireAt'>>;
export declare function getPlayBackUrl<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    origin: Origin;
    streamTitle: string;
    start: number;
    end: number;
}, context: Cxt): Promise<string>;
