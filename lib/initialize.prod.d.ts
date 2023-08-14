import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { InitializeOptions } from 'oak-frontend-base';
import { Aspect, Checker, Connector, StorageSchema } from 'oak-domain/lib/types';
import { EntityDict } from './oak-app-domain';
import { CacheStore } from 'oak-frontend-base/lib/cacheStore/CacheStore';
import { BackendRuntimeContext } from './context/BackendRuntimeContext';
import { FrontendRuntimeContext } from './context/FrontendRuntimeContext';
import { GAD, GFD } from './types/Page';
import { AppType } from './oak-app-domain/Application/Schema';
export declare function initialize<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>, AD extends Record<string, Aspect<ED, Cxt>>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD & GAD<ED, Cxt>>>(type: AppType, domain: string, storageSchema: StorageSchema<ED>, frontendContextBuilder: () => (store: CacheStore<ED, FrontCxt>) => FrontCxt, connector: Connector<ED, Cxt, FrontCxt>, checkers: Array<Checker<ED, keyof ED, FrontCxt | Cxt>>, option: InitializeOptions<ED>): {
    features: GFD<ED, Cxt, FrontCxt, AD & import("./aspects/AspectDict").GeneralAspectDict<ED, Cxt> & import("oak-common-aspect").CommonAspectDict<ED, Cxt>>;
};
