"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
var tslib_1 = require("tslib");
var general_app_domain_1 = require("./general-app-domain");
var lodash_1 = require("oak-domain/lib/utils/lodash");
var initialize_prod_1 = require("oak-frontend-base/lib/initialize-prod");
var checkers_1 = tslib_1.__importDefault(require("./checkers"));
var features_1 = require("./features");
var selectionRewriter_1 = require("./utils/selectionRewriter");
function initialize(type, domain, storageSchema, frontendContextBuilder, connector, checkers, actionDict, actionCascadePathGraph, relationCascadePathGraph, cascadeRemoveDict, colorDict) {
    var checkers2 = checkers_1.default.concat(checkers || []);
    var intersected;
    if (actionDict) {
        intersected = (0, lodash_1.intersection)(Object.keys(general_app_domain_1.ActionDefDict), Object.keys(actionDict));
        if (intersected.length > 0 && process.env.NODE_ENV === 'development') {
            console.warn("\u7528\u6237\u5B9A\u4E49\u7684actionDict\u4E2D\u5B58\u5728\u548Cgeneral-business\u4E2D\u7684actionDict\u540C\u540D\uFF1A\u300C".concat(intersected.join(','), "\u300D\uFF0C\u5C06\u8986\u76D6general-business\u4E2D\u5B9A\u4E49\u7684actionDict\uFF0C\u8BF7\u786E\u4FDD\u903B\u8F91\u6B63\u786E"));
        }
    }
    var actionDict2 = Object.assign({}, general_app_domain_1.ActionDefDict, actionDict);
    var features = (0, initialize_prod_1.initialize)(storageSchema, frontendContextBuilder, connector, checkers2, actionDict2, actionCascadePathGraph, relationCascadePathGraph, cascadeRemoveDict, colorDict).features;
    // 临时代码
    features.cache.cacheStore.registerOperationRewriter(selectionRewriter_1.rewriteOperation);
    features.cache.cacheStore.registerSelectionRewriter(selectionRewriter_1.rewriteSelection);
    var generalFeatures = (0, features_1.initialize)(features, type, domain);
    return {
        features: Object.assign(features, generalFeatures),
    };
}
exports.initialize = initialize;
