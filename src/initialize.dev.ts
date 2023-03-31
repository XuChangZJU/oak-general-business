import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ColorDict } from 'oak-domain/lib/types/Style';
import { ActionDictOfEntityDict, Aspect, AuthDefDict, Checker, Exportation, Importation, Routine, StorageSchema, Timer, Trigger, Watcher } from 'oak-domain/lib/types';
import { EntityDict, ActionDefDict as generalActionDefDict } from './general-app-domain';
import { CacheStore } from 'oak-frontend-base/lib/cacheStore/CacheStore';
import { AsyncRowStore } from 'oak-domain/lib/store/AsyncRowStore';
import { intersection } from 'oak-domain/lib/utils/lodash';
import { BackendRuntimeContext } from './context/BackendRuntimeContext';
import { FrontendRuntimeContext } from './context/FrontendRuntimeContext';
import { GAD, GFD } from './types/Page';
import { initialize as initDev } from 'oak-frontend-base/lib/initialize-dev';
import generalWatchers from './watchers';
import generalCheckers from './checkers';
import generalTriggers from './triggers';
import generalAspectDict from './aspects';
import generalStartRoutines from './routines/start';
import generalData from './data';
import generalAuthDict from './auth';
import { initialize as initGeneralFeatures } from './features';
import { AppType } from './general-app-domain/Application/Schema';
import { rewriteSelection, rewriteOperation } from './utils/selectionRewriter';

export function initialize<
    ED extends EntityDict & BaseEntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    AD extends Record<string, Aspect<ED, Cxt>>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD & GAD<ED, Cxt>>,
>(
    type: AppType,
    domain: string,
    storageSchema: StorageSchema<ED>,
    frontendContextBuilder: () => (store: CacheStore<ED, FrontCxt>) => FrontCxt,
    backendContextBuilder: (contextStr?: string) => (store: AsyncRowStore<ED, Cxt>) =>  Promise<Cxt>,
    aspectDict: AD,
    triggers?: Array<Trigger<ED, keyof ED, Cxt>>,
    checkers?: Array<Checker<ED, keyof ED, FrontCxt | Cxt>>,
    watchers?: Array<Watcher<ED, keyof ED, Cxt>>,
    timers?: Array<Timer<ED, Cxt>>,
    startRoutines?: Array<Routine<ED, Cxt>>,
    initialData?: {
        [T in keyof ED]?: Array<ED[T]['OpSchema']>;
    },
    actionDict?: ActionDictOfEntityDict<ED>,
    authDict?: AuthDefDict<ED>,
    relationDict?: {
        [K in keyof ED]?: {
            [R in NonNullable<ED[K]['Relation']>]?: ED[K]['Relation'][];
        }
    },
    colorDict?: ColorDict<ED>,
    importations?: Importation<ED, keyof ED, any>[],
    exportations?: Exportation<ED, keyof ED, any>[]
) {
    
    let intersected = intersection(Object.keys(generalAspectDict), Object.keys(aspectDict));
    if (intersected.length > 0) {
        throw new Error(
            `用户定义的aspect中不能和general-business中的aspect同名：「${intersected.join(',')}」`
        );
    }
    const aspectDict2 = Object.assign({}, aspectDict, generalAspectDict);
    const checkers2 = (generalCheckers as Array<Checker<ED, keyof ED, FrontCxt | Cxt>>).concat(checkers || []);
    const triggers2 = (generalTriggers as Array<Trigger<ED, keyof ED, Cxt>>).concat(triggers || []);
    const watchers2 = (generalWatchers as Array<Watcher<ED, keyof ED, Cxt>>).concat(watchers || []);
    const startRoutines2 = (generalStartRoutines as Array<Routine<ED, Cxt>>).concat(startRoutines || []);
    if (initialData) {
        intersected = intersection(Object.keys(generalData), Object.keys(initialData));
        if (intersected.length > 0 && process.env.NODE_ENV === 'development') {
            console.warn(`用户定义的initialData中存在和general-business中的initialData同名：「${intersected.join(',')}」，将覆盖general-business中定义的data，请确保逻辑正确`);
        }
    }
    const data2 = Object.assign({}, generalData, initialData);
    if (actionDict) {
        intersected = intersection(Object.keys(generalActionDefDict), Object.keys(actionDict));
        if (intersected.length > 0 && process.env.NODE_ENV === 'development') {
            console.warn(`用户定义的actionDict中存在和general-business中的actionDict同名：「${intersected.join(',')}」，将覆盖general-business中定义的actionDict，请确保逻辑正确`);
        }
    }
    const actionDict2 = Object.assign({}, generalActionDefDict, actionDict);
    if (authDict) {
        intersected = intersection(Object.keys(generalAuthDict), Object.keys(authDict));
        if (intersected.length > 0 && process.env.NODE_ENV === 'development') {
            console.warn(`用户定义的authDict中存在和general-business中的authDict同名：「${intersected.join(',')}」，将覆盖general-business中定义的authDict，请确保逻辑正确`);
        }
    }
    const authDict2 = Object.assign({}, generalAuthDict, authDict);

    const { features } = initDev<ED, Cxt, FrontCxt, AD & GAD<ED, Cxt>>(
        storageSchema,
        frontendContextBuilder,
        backendContextBuilder,
        aspectDict2 as AD & GAD<ED, Cxt>,
        triggers2,
        checkers2,
        watchers2,
        timers,
        startRoutines2,
        data2,
        actionDict2,
        authDict2,
        relationDict,
        colorDict,
        importations,
        exportations,
    );

    const generalFeatures = initGeneralFeatures<ED, Cxt, FrontCxt, AD & GAD<ED, Cxt>>(features, type, domain);

    // 临时代码
    features.cache.cacheStore.registerOperationRewriter(rewriteOperation);
    features.cache.cacheStore.registerSelectionRewriter(rewriteSelection);
  
    return {
        features: Object.assign(features, generalFeatures) as GFD<ED, Cxt, FrontCxt, AD & GAD<ED, Cxt>>,
    };
}