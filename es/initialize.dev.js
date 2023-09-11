import { ActionDefDict as generalActionDefDict } from './oak-app-domain';
import { initialize as initDev } from 'oak-frontend-base/es/initialize-dev';
import { intersection } from 'oak-domain/lib/utils/lodash';
import generalWatchers from './watchers';
import generalCheckers from './checkers';
import generalTriggers from './triggers';
import generalAspectDict from './aspects';
import generalStartRoutines from './routines/start';
import generalData from './data';
import { initialize as initGeneralFeatures } from './features';
import { rewriteSelection, rewriteOperation } from './utils/selectionRewriter';
export function initialize(type, domain, storageSchema, frontendContextBuilder, backendContextBuilder, aspectDict, triggers, checkers, watchers, timers, startRoutines, initialData, option) {
    let intersected = intersection(Object.keys(generalAspectDict), Object.keys(aspectDict));
    if (intersected.length > 0) {
        throw new Error(`用户定义的aspect中不能和general-business中的aspect同名：「${intersected.join(',')}」`);
    }
    const aspectDict2 = Object.assign({}, aspectDict, generalAspectDict);
    const checkers2 = generalCheckers.concat(checkers || []);
    const triggers2 = generalTriggers.concat(triggers || []);
    const watchers2 = generalWatchers.concat(watchers || []);
    const startRoutines2 = generalStartRoutines.concat(startRoutines || []);
    const data2 = Object.assign({}, generalData, initialData);
    if (initialData) {
        intersected = intersection(Object.keys(generalData), Object.keys(initialData));
        if (intersected.length > 0 && process.env.NODE_ENV === 'development') {
            console.warn(`用户定义的initialData中存在和general-business中的initialData同名：「${intersected.join(',')}」，将产生合并，请确保逻辑正确`);
            intersected.forEach((ele) => Object.assign(data2, {
                [ele]: [
                    ...generalData[ele],
                    ...initialData[ele],
                ],
            }));
        }
    }
    if (option.actionDict) {
        intersected = intersection(Object.keys(generalActionDefDict), Object.keys(option.actionDict));
        if (intersected.length > 0 && process.env.NODE_ENV === 'development') {
            console.warn(`用户定义的actionDict中存在和general-business中的actionDict同名：「${intersected.join(',')}」，将覆盖general-business中定义的actionDict，请确保逻辑正确`);
        }
    }
    option.actionDict = Object.assign({}, generalActionDefDict, option.actionDict);
    const { features } = initDev(storageSchema, frontendContextBuilder, backendContextBuilder, aspectDict2, triggers2, checkers2, watchers2, timers, startRoutines2, data2, option);
    const generalFeatures = initGeneralFeatures(features, type, domain);
    // 临时代码
    features.cache.cacheStore.registerOperationRewriter(rewriteOperation);
    features.cache.cacheStore.registerSelectionRewriter(rewriteSelection);
    return {
        features: Object.assign(features, generalFeatures),
    };
}
