"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
var tslib_1 = require("tslib");
var general_app_domain_1 = require("./general-app-domain");
var lodash_1 = require("oak-domain/lib/utils/lodash");
var initialize_prod_1 = require("oak-frontend-base/lib/initialize-prod");
var checkers_1 = tslib_1.__importDefault(require("./checkers"));
var auth_1 = tslib_1.__importDefault(require("./auth"));
var features_1 = require("./features");
function initialize(type, domain, storageSchema, frontendContextBuilder, connector, checkers, actionDict, authDict) {
    var checkers2 = checkers_1.default.concat(checkers || []);
    var intersected;
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
    var features = (0, initialize_prod_1.initialize)(storageSchema, frontendContextBuilder, connector, checkers2, actionDict2, authDict2).features;
    var generalFeatures = (0, features_1.initialize)(features, type, domain);
    return {
        features: Object.assign(features, generalFeatures),
    };
}
exports.initialize = initialize;
