"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
const tslib_1 = require("tslib");
const oak_app_domain_1 = require("./oak-app-domain");
const initialize_dev_1 = require("oak-frontend-base/es/initialize-dev");
const lodash_1 = require("oak-domain/lib/utils/lodash");
const watchers_1 = tslib_1.__importDefault(require("./watchers"));
const checkers_1 = tslib_1.__importDefault(require("./checkers"));
const triggers_1 = tslib_1.__importDefault(require("./triggers"));
const aspects_1 = tslib_1.__importDefault(require("./aspects"));
const start_1 = tslib_1.__importDefault(require("./routines/start"));
const data_1 = tslib_1.__importDefault(require("./data"));
const features_1 = require("./features");
const selectionRewriter_1 = require("./utils/selectionRewriter");
function initialize(type, domain, storageSchema, frontendContextBuilder, backendContextBuilder, aspectDict, triggers, checkers, watchers, timers, startRoutines, initialData, option) {
    let intersected = (0, lodash_1.intersection)(Object.keys(aspects_1.default), Object.keys(aspectDict));
    if (intersected.length > 0) {
        throw new Error(`用户定义的aspect中不能和general-business中的aspect同名：「${intersected.join(',')}」`);
    }
    const aspectDict2 = Object.assign({}, aspectDict, aspects_1.default);
    const checkers2 = checkers_1.default.concat(checkers || []);
    const triggers2 = triggers_1.default.concat(triggers || []);
    const watchers2 = watchers_1.default.concat(watchers || []);
    const startRoutines2 = start_1.default.concat(startRoutines || []);
    const data2 = Object.assign({}, data_1.default, initialData);
    if (initialData) {
        intersected = (0, lodash_1.intersection)(Object.keys(data_1.default), Object.keys(initialData));
        if (intersected.length > 0 && process.env.NODE_ENV === 'development') {
            console.warn(`用户定义的initialData中存在和general-business中的initialData同名：「${intersected.join(',')}」，将产生合并，请确保逻辑正确`);
            intersected.forEach((ele) => Object.assign(data2, {
                [ele]: [
                    ...data_1.default[ele],
                    ...initialData[ele],
                ],
            }));
        }
    }
    if (option.actionDict) {
        intersected = (0, lodash_1.intersection)(Object.keys(oak_app_domain_1.ActionDefDict), Object.keys(option.actionDict));
        if (intersected.length > 0 && process.env.NODE_ENV === 'development') {
            console.warn(`用户定义的actionDict中存在和general-business中的actionDict同名：「${intersected.join(',')}」，将覆盖general-business中定义的actionDict，请确保逻辑正确`);
        }
    }
    option.actionDict = Object.assign({}, oak_app_domain_1.ActionDefDict, option.actionDict);
    const { features } = (0, initialize_dev_1.initialize)(storageSchema, frontendContextBuilder, backendContextBuilder, aspectDict2, triggers2, checkers2, watchers2, timers, startRoutines2, data2, option);
    const generalFeatures = (0, features_1.initialize)(features, type, domain);
    // 临时代码
    features.cache.cacheStore.registerOperationRewriter(selectionRewriter_1.rewriteOperation);
    features.cache.cacheStore.registerSelectionRewriter(selectionRewriter_1.rewriteSelection);
    return {
        features: Object.assign(features, generalFeatures),
    };
}
exports.initialize = initialize;
