import { RuntimeContext } from '../context/RuntimeContext';
import { EntityDict } from '../general-app-domain';
import { Origin, Service } from '../types/Config';
export declare function getConfig<ED extends EntityDict, Cxt extends RuntimeContext<ED>>(context: Cxt, service: Service, origin: Origin): Promise<{
    instance: import("oak-external-sdk").QiniuCloudInstance;
    config: any;
} | {
    instance: import("oak-external-sdk").AmapInstance;
    config: any;
}>;
