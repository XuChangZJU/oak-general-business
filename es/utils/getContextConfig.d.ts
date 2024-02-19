import { Origin, Service } from '../types/Config';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext, AspectDict } from '../context/FrontendRuntimeContext';
import { ED as EntityDict } from '../types/RuntimeCxt';
/**
 * 目前虽然数据结构上config也可能在platform上，但是实际中暂时还没有
 * @param context
 * @param service
 * @param origin
 * @returns
 */
export declare function getConfig<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AspectDict<ED, Cxt>>>(context: Cxt | FrontCxt, service: Service, origin: Origin): {
    instance: import("oak-external-sdk").QiniuCloudInstance;
    config: any;
} | {
    instance: import("oak-external-sdk").CTYunInstance;
    config: any;
} | {
    instance: import("oak-external-sdk").AmapInstance;
    config: any;
};
