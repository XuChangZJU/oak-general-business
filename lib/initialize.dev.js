"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
var tslib_1 = require("tslib");
var general_app_domain_1 = require("./general-app-domain");
var lodash_1 = require("oak-domain/lib/utils/lodash");
var initialize_dev_1 = require("oak-frontend-base/lib/initialize-dev");
var watchers_1 = tslib_1.__importDefault(require("./watchers"));
var checkers_1 = tslib_1.__importDefault(require("./checkers"));
var triggers_1 = tslib_1.__importDefault(require("./triggers"));
var aspects_1 = tslib_1.__importDefault(require("./aspects"));
var start_1 = tslib_1.__importDefault(require("./routines/start"));
var data_1 = tslib_1.__importDefault(require("./data"));
var auth_1 = tslib_1.__importDefault(require("./auth"));
var features_1 = require("./features");
var selectionRewriter_1 = require("./utils/selectionRewriter");
function initialize(type, domain, storageSchema, frontendContextBuilder, backendContextBuilder, aspectDict, triggers, checkers, watchers, timers, startRoutines, initialData, actionDict, authDict, relationDict, colorDict, importations, exportations) {
    var intersected = (0, lodash_1.intersection)(Object.keys(aspects_1.default), Object.keys(aspectDict));
    if (intersected.length > 0) {
        throw new Error("\u7528\u6237\u5B9A\u4E49\u7684aspect\u4E2D\u4E0D\u80FD\u548Cgeneral-business\u4E2D\u7684aspect\u540C\u540D\uFF1A\u300C".concat(intersected.join(','), "\u300D"));
    }
    var aspectDict2 = Object.assign({}, aspectDict, aspects_1.default);
    var checkers2 = checkers_1.default.concat(checkers || []);
    var triggers2 = triggers_1.default.concat(triggers || []);
    var watchers2 = watchers_1.default.concat(watchers || []);
    var startRoutines2 = start_1.default.concat(startRoutines || []);
    if (initialData) {
        intersected = (0, lodash_1.intersection)(Object.keys(data_1.default), Object.keys(initialData));
        if (intersected.length > 0 && process.env.NODE_ENV === 'development') {
            console.warn("\u7528\u6237\u5B9A\u4E49\u7684initialData\u4E2D\u5B58\u5728\u548Cgeneral-business\u4E2D\u7684initialData\u540C\u540D\uFF1A\u300C".concat(intersected.join(','), "\u300D\uFF0C\u5C06\u8986\u76D6general-business\u4E2D\u5B9A\u4E49\u7684data\uFF0C\u8BF7\u786E\u4FDD\u903B\u8F91\u6B63\u786E"));
        }
    }
    var data2 = Object.assign({}, data_1.default, initialData);
    if (actionDict) {
        intersected = (0, lodash_1.intersection)(Object.keys(general_app_domain_1.ActionDefDict), Object.keys(actionDict));
        if (intersected.length > 0 && process.env.NODE_ENV === 'development') {
            console.warn("\u7528\u6237\u5B9A\u4E49\u7684actionDict\u4E2D\u5B58\u5728\u548Cgeneral-business\u4E2D\u7684actionDict\u540C\u540D\uFF1A\u300C".concat(intersected.join(','), "\u300D\uFF0C\u5C06\u8986\u76D6general-business\u4E2D\u5B9A\u4E49\u7684actionDict\uFF0C\u8BF7\u786E\u4FDD\u903B\u8F91\u6B63\u786E"));
        }
    }
    var actionDict2 = Object.assign({}, general_app_domain_1.ActionDefDict, actionDict);
    if (authDict) {
        intersected = (0, lodash_1.intersection)(Object.keys(auth_1.default), Object.keys(authDict));
        if (intersected.length > 0 && process.env.NODE_ENV === 'development') {
            console.warn("\u7528\u6237\u5B9A\u4E49\u7684authDict\u4E2D\u5B58\u5728\u548Cgeneral-business\u4E2D\u7684authDict\u540C\u540D\uFF1A\u300C".concat(intersected.join(','), "\u300D\uFF0C\u5C06\u8986\u76D6general-business\u4E2D\u5B9A\u4E49\u7684authDict\uFF0C\u8BF7\u786E\u4FDD\u903B\u8F91\u6B63\u786E"));
        }
    }
    var authDict2 = Object.assign({}, auth_1.default, authDict);
    var features = (0, initialize_dev_1.initialize)(storageSchema, frontendContextBuilder, backendContextBuilder, aspectDict2, triggers2, checkers2, watchers2, timers, startRoutines2, data2, actionDict2, authDict2, relationDict, colorDict, importations, exportations).features;
    var generalFeatures = (0, features_1.initialize)(features, type, domain);
    // 临时代码
    features.cache.cacheStore.registerOperationRewriter(selectionRewriter_1.rewriteOperation);
    features.cache.cacheStore.registerSelectionRewriter(selectionRewriter_1.rewriteSelection);
    return {
        features: Object.assign(features, generalFeatures),
    };
}
exports.initialize = initialize;
