"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("./token");
const extraFile_1 = require("./extraFile");
const application_1 = require("./application");
const config_1 = require("./config");
const style2_1 = require("./style2");
const template_1 = require("./template");
const user_1 = require("./user");
const wechatLogin_1 = require("./wechatLogin");
const wechatUser_1 = require("./wechatUser");
const wechatQrCode_1 = require("./wechatQrCode");
const userEntityGrant_1 = require("./userEntityGrant");
const session_1 = require("./session");
const wechatMenu_1 = require("./wechatMenu");
const wechatPublicTag_1 = require("./wechatPublicTag");
const userWechatPublicTag_1 = require("./userWechatPublicTag");
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
    updateStyle: style2_1.updateStyle,
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
    uploadWechatMedia: application_1.uploadWechatMedia,
    getCurrentMenu: wechatMenu_1.getCurrentMenu,
    getMenu: wechatMenu_1.getMenu,
    createMenu: wechatMenu_1.createMenu,
    createConditionalMenu: wechatMenu_1.createConditionalMenu,
    deleteConditionalMenu: wechatMenu_1.deleteConditionalMenu,
    deleteMenu: wechatMenu_1.deleteMenu,
    batchGetArticle: application_1.batchGetArticle,
    getArticle: application_1.getArticle,
    batchGetMaterialList: application_1.batchGetMaterialList,
    getMaterial: application_1.getMaterial,
    createSession: session_1.createSession,
    createTag: wechatPublicTag_1.createTag,
    getTags: wechatPublicTag_1.getTags,
    editTag: wechatPublicTag_1.editTag,
    deleteTag: wechatPublicTag_1.deleteTag,
    syncMessageTemplate: template_1.syncMessageTemplate,
    syncTag: wechatPublicTag_1.syncTag,
    oneKeySync: wechatPublicTag_1.oneKeySync,
    getTagUsers: userWechatPublicTag_1.getTagUsers,
    batchtagging: userWechatPublicTag_1.batchtagging,
    batchuntagging: userWechatPublicTag_1.batchuntagging,
    getUserTags: userWechatPublicTag_1.getUserTags,
    getUsers: userWechatPublicTag_1.getUsers,
    tagging: userWechatPublicTag_1.tagging,
    syncToLocale: userWechatPublicTag_1.syncToLocale,
    syncToWechat: userWechatPublicTag_1.syncToWechat,
};
exports.default = aspectDict;
