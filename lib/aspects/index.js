"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("./token");
var extraFile_1 = require("./extraFile");
var application_1 = require("./application");
var config_1 = require("./config");
var user_1 = require("./user");
var aspectDict = {
    mergeUser: user_1.mergeUser,
    switchTo: token_1.switchTo,
    refreshWechatPublicUserInfo: token_1.refreshWechatPublicUserInfo,
    loginByMobile: token_1.loginByMobile,
    loginWechat: token_1.loginWechat,
    loginWechatMp: token_1.loginWechatMp,
    syncUserInfoWechatMp: token_1.syncUserInfoWechatMp,
    getUploadInfo: extraFile_1.getUploadInfo,
    sendCaptcha: token_1.sendCaptcha,
    getApplication: application_1.getApplication,
    updateConfig: config_1.updateConfig,
    updateApplicationConfig: config_1.updateApplicationConfig,
    getWechatMpUserPhoneNumber: token_1.getWechatMpUserPhoneNumber,
    logout: token_1.logout,
    signatureJsSDK: application_1.signatureJsSDK,
};
exports.default = aspectDict;
