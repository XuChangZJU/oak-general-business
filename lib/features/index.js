"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
const tslib_1 = require("tslib");
const token_1 = require("./token");
const extraFile_1 = require("./extraFile");
const extraFile2_1 = require("./extraFile2");
const application_1 = require("./application");
const config_1 = require("./config");
const style2_1 = require("./style2");
const template_1 = require("./template");
const weiXinJsSdk_1 = require("./weiXinJsSdk");
const wechatMenu_1 = require("./wechatMenu");
const wechatPublicTag_1 = require("./wechatPublicTag");
const theme_1 = tslib_1.__importDefault(require("./theme"));
function initialize(basicFeatures, type, domain) {
    const application = new application_1.Application(type, domain, basicFeatures.cache, basicFeatures.localStorage);
    const token = new token_1.Token(basicFeatures.cache, basicFeatures.localStorage, basicFeatures.environment);
    const wechatMenu = new wechatMenu_1.WechatMenu(basicFeatures.cache, basicFeatures.localStorage);
    const wechatPublicTag = new wechatPublicTag_1.WechatPublicTag(basicFeatures.cache, basicFeatures.localStorage);
    // 临时代码，合并后再删
    const extraFile = new extraFile_1.ExtraFile(basicFeatures.cache, application, basicFeatures.locales);
    const extraFile2 = new extraFile2_1.ExtraFile2(basicFeatures.cache, application, basicFeatures.locales);
    const config = new config_1.Config(basicFeatures.cache);
    const style2 = new style2_1.Style2(basicFeatures.cache);
    const template = new template_1.Template(basicFeatures.cache);
    const weiXinJsSdk = new weiXinJsSdk_1.WeiXinJsSdk(basicFeatures.cache, basicFeatures.localStorage, basicFeatures.environment);
    const theme = new theme_1.default(basicFeatures.cache, basicFeatures.localStorage);
    return {
        token,
        extraFile,
        extraFile2,
        application,
        config,
        style2,
        template,
        weiXinJsSdk,
        theme,
        wechatMenu,
        wechatPublicTag,
    };
}
exports.initialize = initialize;
