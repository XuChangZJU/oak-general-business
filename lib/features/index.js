"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
var tslib_1 = require("tslib");
var token_1 = require("./token");
var extraFile_1 = require("./extraFile");
var application_1 = require("./application");
var config_1 = require("./config");
var weiXinJsSdk_1 = require("./weiXinJsSdk");
var theme_1 = tslib_1.__importDefault(require("./theme"));
function initialize(basicFeatures, type, domain) {
    var application = new application_1.Application(type, domain, basicFeatures.cache, basicFeatures.localStorage);
    var token = new token_1.Token(basicFeatures.cache, basicFeatures.localStorage);
    // 临时代码，合并后再删
    var extraFile = new extraFile_1.ExtraFile(basicFeatures.cache, application, basicFeatures.locales);
    var config = new config_1.Config(basicFeatures.cache);
    var weiXinJsSdk = new weiXinJsSdk_1.WeiXinJsSdk(basicFeatures.cache, basicFeatures.localStorage);
    var theme = new theme_1.default(basicFeatures.cache, basicFeatures.localStorage);
    return {
        token: token,
        extraFile: extraFile,
        application: application,
        config: config,
        weiXinJsSdk: weiXinJsSdk,
        theme: theme,
    };
}
exports.initialize = initialize;
