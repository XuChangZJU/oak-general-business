"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("./token");
const extraFile_1 = require("./extraFile");
const application_1 = require("./application");
const config_1 = require("./config");
const user_1 = require("./user");
const wechatLogin_1 = require("./wechatLogin");
const wechatUser_1 = require("./wechatUser");
const wechatQrCode_1 = require("./wechatQrCode");
const userEntityGrant_1 = require("./userEntityGrant");
const wechatMenu_1 = require("./wechatMenu");
const aspectDict = {
    mergeUser: user_1.mergeUser,
    switchTo: token_1.switchTo,
    refreshWechatPublicUserInfo: token_1.refreshWechatPublicUserInfo,
    loginByMobile: token_1.loginByMobile,
    loginWechat: token_1.loginWechat,
    loginWechatMp: token_1.loginWechatMp,
    wakeupParasite: token_1.wakeupParasite,
    syncUserInfoWechatMp: token_1.syncUserInfoWechatMp,
    sendCaptcha: token_1.sendCaptcha,
    getApplication: application_1.getApplication,
    updateConfig: config_1.updateConfig,
    updateApplicationConfig: config_1.updateApplicationConfig,
    getWechatMpUserPhoneNumber: token_1.getWechatMpUserPhoneNumber,
    logout: token_1.logout,
    signatureJsSDK: application_1.signatureJsSDK,
    createWechatLogin: wechatLogin_1.createWechatLogin,
    unbindingWechat: wechatUser_1.unbindingWechat,
    loginByWechat: token_1.loginByWechat,
    getInfoByUrl: extraFile_1.getInfoByUrl,
    getChangePasswordChannels: user_1.getChangePasswordChannels,
    updateUserPassword: user_1.updateUserPassword,
    getMpUnlimitWxaCode: wechatQrCode_1.getMpUnlimitWxaCode,
    confirmUserEntityGrant: userEntityGrant_1.confirmUserEntityGrant,
    getCurrentMenu: wechatMenu_1.getCurrentMenu,
    getMenu: wechatMenu_1.getMenu,
    createMenu: wechatMenu_1.createMenu,
    createConditionalMenu: wechatMenu_1.createConditionalMenu,
    deleteConditionalMenu: wechatMenu_1.deleteConditionalMenu,
    batchGetArticle: wechatMenu_1.batchGetArticle,
    getArticle: wechatMenu_1.getArticle,
    createMaterial: wechatMenu_1.createMaterial,
    batchGetMaterialList: wechatMenu_1.batchGetMaterialList,
    getMaterial: wechatMenu_1.getMaterial,
};
exports.default = aspectDict;
