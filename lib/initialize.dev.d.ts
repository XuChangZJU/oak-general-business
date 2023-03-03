import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ActionDictOfEntityDict, Aspect, AuthDefDict, Checker, Exportation, Importation, Routine, StorageSchema, Timer, Trigger, Watcher } from 'oak-domain/lib/types';
import { EntityDict } from './general-app-domain';
import { CacheStore } from 'oak-frontend-base/lib/cacheStore/CacheStore';
import { AsyncRowStore } from 'oak-domain/lib/store/AsyncRowStore';
import { BackendRuntimeContext } from './context/BackendRuntimeContext';
import { FrontendRuntimeContext } from './context/FrontendRuntimeContext';
import { GAD, GFD } from './types/Page';
import { AppType } from './general-app-domain/Application/Schema';
export declare function initialize<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>, AD extends Record<string, Aspect<ED, Cxt>>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD & GAD<ED, Cxt>>>(type: AppType, domain: string, storageSchema: StorageSchema<ED>, frontendContextBuilder: () => (store: CacheStore<ED, FrontCxt>) => FrontCxt, backendContextBuilder: (contextStr?: string) => (store: AsyncRowStore<ED, Cxt>) => Promise<Cxt>, aspectDict: AD, triggers?: Array<Trigger<ED, keyof ED, Cxt>>, checkers?: Array<Checker<ED, keyof ED, FrontCxt | Cxt>>, watchers?: Array<Watcher<ED, keyof ED, Cxt>>, timers?: Array<Timer<ED, Cxt>>, startRoutines?: Array<Routine<ED, Cxt>>, initialData?: {
    [T in keyof ED]?: Array<ED[T]['OpSchema']>;
}, actionDict?: ActionDictOfEntityDict<ED>, authDict?: AuthDefDict<ED>, relationDict?: {
    [K in keyof ED]?: {
        [R in NonNullable<ED[K]['Relation']>]?: ED[K]['Relation'][];
    };
}, importations?: Importation<ED, keyof ED, any>[], exportations?: Exportation<ED, keyof ED, any>[]): {
    features: GFD<ED, Cxt, FrontCxt, AD & import("./aspects/AspectDict").AspectDict<ED, Cxt> & import("oak-common-aspect").CommonAspectDict<ED, Cxt>>;
};
