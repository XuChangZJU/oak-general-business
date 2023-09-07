import { ActionDefDict as generalActionDefDict } from './oak-app-domain';
import { intersection } from 'oak-domain/lib/utils/lodash';
import { initialize as initProd } from 'oak-frontend-base/es/initialize-prod';
import generalCheckers from './checkers';
import { initialize as initGeneralFeatures } from './features';
import { rewriteSelection, rewriteOperation } from './utils/selectionRewriter';
export function initialize(type, domain, storageSchema, frontendContextBuilder, connector, checkers, option) {
    const checkers2 = generalCheckers.concat(checkers || []);
    let intersected;
    if (option.actionDict) {
        intersected = intersection(Object.keys(generalActionDefDict), Object.keys(option.actionDict));
        if (intersected.length > 0 && process.env.NODE_ENV === 'development') {
            console.warn(`用户定义的actionDict中存在和general-business中的actionDict同名：「${intersected.join(',')}」，将覆盖general-business中定义的actionDict，请确保逻辑正确`);
        }
    }
    option.actionDict = Object.assign({}, generalActionDefDict, option.actionDict);
    const { features } = initProd(storageSchema, frontendContextBuilder, connector, checkers2, option);
    // 临时代码
    features.cache.cacheStore.registerOperationRewriter(rewriteOperation);
    features.cache.cacheStore.registerSelectionRewriter(rewriteSelection);
    const generalFeatures = initGeneralFeatures(features, type, domain);
    return {
        features: Object.assign(features, generalFeatures),
    };
}
