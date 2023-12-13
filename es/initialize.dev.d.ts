import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { Aspect, Checker, Routine, StorageSchema, Timer, Trigger, Watcher } from 'oak-domain/lib/types';
import { EntityDict } from './oak-app-domain';
import { CacheStore } from 'oak-frontend-base';
import { AsyncRowStore } from 'oak-domain/lib/store/AsyncRowStore';
import { BackendRuntimeContext } from './context/BackendRuntimeContext';
import { FrontendRuntimeContext } from './context/FrontendRuntimeContext';
import { GAD, GFD } from './types/Page';
import type GeneralAspectDict from './aspects/AspectDict';
import { AppType } from './oak-app-domain/Application/Schema';
import { InitializeOptions } from 'oak-frontend-base';
export declare function initialize<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>, AD extends Record<string, Aspect<ED, Cxt>>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD & GAD<ED, Cxt>>>(type: AppType, domain: string, storageSchema: StorageSchema<ED>, frontendContextBuilder: () => (store: CacheStore<ED, FrontCxt>) => FrontCxt, backendContextBuilder: (contextStr?: string) => (store: AsyncRowStore<ED, Cxt>) => Promise<Cxt>, aspectDict: AD, triggers: Array<Trigger<ED, keyof ED, Cxt>>, checkers: Array<Checker<ED, keyof ED, FrontCxt | Cxt>>, watchers: Array<Watcher<ED, keyof ED, Cxt>>, timers: Array<Timer<ED, keyof ED, Cxt>>, startRoutines: Array<Routine<ED, keyof ED, Cxt>>, initialData: {
    [T in keyof ED]?: Array<ED[T]['OpSchema']>;
}, option: InitializeOptions<ED, Cxt>): {
    features: GFD<ED, Cxt, FrontCxt, AD & GeneralAspectDict<ED, Cxt> & import("oak-common-aspect").CommonAspectDict<ED, Cxt>>;
};
