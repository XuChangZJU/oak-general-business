"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
var tslib_1 = require("tslib");
var oak_app_domain_1 = require("./oak-app-domain");
var initialize_dev_1 = require("oak-frontend-base/es/initialize-dev");
var lodash_1 = require("oak-domain/lib/utils/lodash");
var watchers_1 = tslib_1.__importDefault(require("./watchers"));
var checkers_1 = tslib_1.__importDefault(require("./checkers"));
var triggers_1 = tslib_1.__importDefault(require("./triggers"));
var aspects_1 = tslib_1.__importDefault(require("./aspects"));
var start_1 = tslib_1.__importDefault(require("./routines/start"));
var data_1 = tslib_1.__importDefault(require("./data"));
var features_1 = require("./features");
var selectionRewriter_1 = require("./utils/selectionRewriter");
function initialize(type, domain, storageSchema, frontendContextBuilder, backendContextBuilder, aspectDict, triggers, checkers, watchers, timers, startRoutines, initialData, option) {
    var intersected = (0, lodash_1.intersection)(Object.keys(aspects_1.default), Object.keys(aspectDict));
    if (intersected.length > 0) {
        throw new Error("\u7528\u6237\u5B9A\u4E49\u7684aspect\u4E2D\u4E0D\u80FD\u548Cgeneral-business\u4E2D\u7684aspect\u540C\u540D\uFF1A\u300C".concat(intersected.join(','), "\u300D"));
    }
    var aspectDict2 = Object.assign({}, aspectDict, aspects_1.default);
    var checkers2 = checkers_1.default.concat(checkers || []);
    var triggers2 = triggers_1.default.concat(triggers || []);
    var watchers2 = watchers_1.default.concat(watchers || []);
    var startRoutines2 = start_1.default.concat(startRoutines || []);
    var data2 = Object.assign({}, data_1.default, initialData);
    if (initialData) {
        intersected = (0, lodash_1.intersection)(Object.keys(data_1.default), Object.keys(initialData));
        if (intersected.length > 0 && process.env.NODE_ENV === 'development') {
            console.warn("\u7528\u6237\u5B9A\u4E49\u7684initialData\u4E2D\u5B58\u5728\u548Cgeneral-business\u4E2D\u7684initialData\u540C\u540D\uFF1A\u300C".concat(intersected.join(','), "\u300D\uFF0C\u5C06\u4EA7\u751F\u5408\u5E76\uFF0C\u8BF7\u786E\u4FDD\u903B\u8F91\u6B63\u786E"));
            intersected.forEach(function (ele) {
                var _a;
                return Object.assign(data2, (_a = {},
                    _a[ele] = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(data_1.default[ele]), false), tslib_1.__read(initialData[ele]), false),
                    _a));
            });
        }
    }
    if (option.actionDict) {
        intersected = (0, lodash_1.intersection)(Object.keys(oak_app_domain_1.ActionDefDict), Object.keys(option.actionDict));
        if (intersected.length > 0 && process.env.NODE_ENV === 'development') {
            console.warn("\u7528\u6237\u5B9A\u4E49\u7684actionDict\u4E2D\u5B58\u5728\u548Cgeneral-business\u4E2D\u7684actionDict\u540C\u540D\uFF1A\u300C".concat(intersected.join(','), "\u300D\uFF0C\u5C06\u8986\u76D6general-business\u4E2D\u5B9A\u4E49\u7684actionDict\uFF0C\u8BF7\u786E\u4FDD\u903B\u8F91\u6B63\u786E"));
        }
    }
    option.actionDict = Object.assign({}, oak_app_domain_1.ActionDefDict, option.actionDict);
    var features = (0, initialize_dev_1.initialize)(storageSchema, frontendContextBuilder, backendContextBuilder, aspectDict2, triggers2, checkers2, watchers2, timers, startRoutines2, data2, option).features;
    var generalFeatures = (0, features_1.initialize)(features, type, domain);
    // 临时代码
    features.cache.cacheStore.registerOperationRewriter(selectionRewriter_1.rewriteOperation);
    features.cache.cacheStore.registerSelectionRewriter(selectionRewriter_1.rewriteSelection);
    return {
        features: Object.assign(features, generalFeatures),
    };
}
exports.initialize = initialize;
