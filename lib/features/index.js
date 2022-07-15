"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
const token_1 = require("./token");
const extraFile_1 = require("./extraFile");
const application_1 = require("./application");
function initialize(aspectWrapper, basicFeatures, type, url, context) {
    const application = new application_1.Application(aspectWrapper, type, url, basicFeatures.cache, basicFeatures.localStorage, (application) => context.setApplication(application));
    const token = new token_1.Token(aspectWrapper, basicFeatures.cache, basicFeatures.localStorage, context);
    const extraFile = new extraFile_1.ExtraFile(aspectWrapper);
    return {
        token,
        extraFile,
        application,
    };
}
exports.initialize = initialize;
