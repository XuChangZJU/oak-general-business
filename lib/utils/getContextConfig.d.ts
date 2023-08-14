import { EntityDict } from '../oak-app-domain';
import { Origin, Service } from '../types/Config';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
export declare function getConfig<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(context: Cxt, service: Service, origin: Origin): Promise<{
    instance: import("oak-external-sdk").QiniuCloudInstance;
    config: any;
} | {
    instance: import("oak-external-sdk").AmapInstance;
    config: any;
}>;
