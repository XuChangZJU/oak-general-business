import { GeneralRuntimeContext } from '../RuntimeContext';
import { EntityDict } from '../general-app-domain';
import { Schema as Livestream } from '../general-app-domain/Livestream/Schema';
import { Datetime } from 'oak-domain/lib/types/DataType';
/**
 * 创建直播流并生成推拉流地址
 * @param streamTitle 直播流名称
 * @param expireAt 推流过期时间
 * @param context context
 * @returns Livestream 对象
 */
export declare function getLivestream<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(params: {
    streamTitle: string;
    expireAt: Datetime;
}, context: Cxt): Promise<Pick<Livestream, 'streamTitle' | 'hub' | 'rtmpPushUrl' | 'rtmpPlayUrl' | 'pcPushUrl' | 'streamKey' | 'expireAt'>>;
/**
 * 直播流已存在的情况下，获取推拉流地址
 * @param streamTitle 直播流名称
 * @param expireAt 推流过期时间
 * @param context context
 * @returns livestream对象
 */
export declare function getLivestream2<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(params: {
    streamTitle: string;
    expireAt: Datetime;
}, context: Cxt): Promise<Pick<Livestream, 'streamTitle' | 'hub' | 'rtmpPushUrl' | 'rtmpPlayUrl' | 'pcPushUrl' | 'streamKey' | 'expireAt'>>;
