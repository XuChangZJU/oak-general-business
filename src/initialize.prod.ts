import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { InitializeOptions } from 'oak-frontend-base';
import { initialize as initProd } from 'oak-frontend-base/es/initialize-prod';
import {
    Aspect,
    Checker,
    Connector,
    StorageSchema,
} from 'oak-domain/lib/types';
import { EntityDict, ActionDefDict as generalActionDefDict } from './oak-app-domain';
import { CacheStore } from 'oak-frontend-base';
import { intersection } from 'oak-domain/lib/utils/lodash';
import { BackendRuntimeContext } from './context/BackendRuntimeContext';
import { FrontendRuntimeContext } from './context/FrontendRuntimeContext';
import { GAD, GFD } from './types/Page';
import generalCheckers from './checkers';
import { initialize as initGeneralFeatures } from './features';
import { AppType } from './oak-app-domain/Application/Schema';

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
    connector: Connector<ED, FrontCxt>,
    checkers: Array<Checker<ED, keyof ED, FrontCxt | Cxt>>,
    option: InitializeOptions<ED, Cxt>
) {
    const checkers2 = (generalCheckers as Array<Checker<ED, keyof ED, FrontCxt | Cxt>>).concat(checkers || []);
    let intersected: string[];
    if (option.actionDict) {
        intersected = intersection(Object.keys(generalActionDefDict), Object.keys(option.actionDict));
        if (intersected.length > 0 && process.env.NODE_ENV === 'development') {
            console.warn(`用户定义的actionDict中存在和general-business中的actionDict同名：「${intersected.join(',')}」，将覆盖general-business中定义的actionDict，请确保逻辑正确`);
        }
    }
    option.actionDict = Object.assign({}, generalActionDefDict, option.actionDict);
    
    const { features } = initProd<ED, Cxt, FrontCxt, AD & GAD<ED, Cxt>>(
        storageSchema,
        frontendContextBuilder,
        connector,
        checkers2,
        option
    );
    
    // 临时代码
    features.cache.cacheStore.registerOperationRewriter(rewriteOperation);
    features.cache.cacheStore.registerSelectionRewriter(rewriteSelection);

    const generalFeatures = initGeneralFeatures<ED, Cxt, FrontCxt, AD & GAD<ED, Cxt>>(features, type, domain);
  
    return {
        features: Object.assign(features, generalFeatures) as GFD<ED, Cxt, FrontCxt, AD & GAD<ED, Cxt>>,
    };
}