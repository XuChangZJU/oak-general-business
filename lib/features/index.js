"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
const tslib_1 = require("tslib");
const token_1 = require("./token");
const extraFile_1 = require("./extraFile");
const application_1 = require("./application");
const config_1 = require("./config");
const weiXinJsSdk_1 = require("./weiXinJsSdk");
const theme_1 = tslib_1.__importDefault(require("./theme"));
function initialize(basicFeatures, type, domain) {
    const application = new application_1.Application(type, domain, basicFeatures.cache, basicFeatures.localStorage);
    const token = new token_1.Token(basicFeatures.cache, basicFeatures.localStorage, basicFeatures.environment);
    // 临时代码，合并后再删
    const extraFile = new extraFile_1.ExtraFile(basicFeatures.cache, application, basicFeatures.locales);
    const config = new config_1.Config(basicFeatures.cache);
    const weiXinJsSdk = new weiXinJsSdk_1.WeiXinJsSdk(basicFeatures.cache, basicFeatures.localStorage, basicFeatures.environment);
    const theme = new theme_1.default(basicFeatures.cache, basicFeatures.localStorage);
    return {
        token,
        extraFile,
        application,
        config,
        weiXinJsSdk,
        theme,
    };
}
exports.initialize = initialize;
