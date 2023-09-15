"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
const tslib_1 = require("tslib");
const initialize_prod_1 = require("oak-frontend-base/es/initialize-prod");
const oak_app_domain_1 = require("./oak-app-domain");
const lodash_1 = require("oak-domain/lib/utils/lodash");
const checkers_1 = tslib_1.__importDefault(require("./checkers"));
const features_1 = require("./features");
const selectionRewriter_1 = require("./utils/selectionRewriter");
function initialize(type, domain, storageSchema, frontendContextBuilder, connector, checkers, option) {
    const checkers2 = checkers_1.default.concat(checkers || []);
    let intersected;
    if (option.actionDict) {
        intersected = (0, lodash_1.intersection)(Object.keys(oak_app_domain_1.ActionDefDict), Object.keys(option.actionDict));
        if (intersected.length > 0 && process.env.NODE_ENV === 'development') {
            console.warn(`用户定义的actionDict中存在和general-business中的actionDict同名：「${intersected.join(',')}」，将覆盖general-business中定义的actionDict，请确保逻辑正确`);
        }
    }
    option.actionDict = Object.assign({}, oak_app_domain_1.ActionDefDict, option.actionDict);
    const { features } = (0, initialize_prod_1.initialize)(storageSchema, frontendContextBuilder, connector, checkers2, option);
    // 临时代码
    features.cache.cacheStore.registerOperationRewriter(selectionRewriter_1.rewriteOperation);
    features.cache.cacheStore.registerSelectionRewriter(selectionRewriter_1.rewriteSelection);
    const generalFeatures = (0, features_1.initialize)(features, type, domain);
    return {
        features: Object.assign(features, generalFeatures),
    };
}
exports.initialize = initialize;
