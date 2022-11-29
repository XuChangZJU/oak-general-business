"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
var token_1 = require("./token");
var extraFile_1 = require("./extraFile");
var application_1 = require("./application");
var config_1 = require("./config");
function initialize(basicFeatures, type, domain) {
    var application = new application_1.Application(type, domain, basicFeatures.cache, basicFeatures.localStorage);
    var token = new token_1.Token(basicFeatures.cache, basicFeatures.localStorage);
    var extraFile = new extraFile_1.ExtraFile(basicFeatures.cache);
    var config = new config_1.Config(basicFeatures.cache);
    return {
        token: token,
        extraFile: extraFile,
        application: application,
        config: config,
    };
}
exports.initialize = initialize;
