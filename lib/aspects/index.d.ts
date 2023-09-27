import { loginByMobile, loginWechat, loginWechatMp, syncUserInfoWechatMp, sendCaptcha, switchTo, refreshWechatPublicUserInfo, getWechatMpUserPhoneNumber, logout, loginByWechat, wakeupParasite } from './token';
import { getInfoByUrl } from './extraFile';
import { getApplication, signatureJsSDK, uploadWechatMedia } from './application';
import { updateConfig, updateApplicationConfig } from './config';
import { mergeUser, getChangePasswordChannels, updateUserPassword } from './user';
import { createWechatLogin } from './wechatLogin';
import { unbindingWechat } from './wechatUser';
import { getMpUnlimitWxaCode } from './wechatQrCode';
import { confirmUserEntityGrant } from './userEntityGrant';
import { createSession } from './session';
import { getCurrentMenu, getMenu, createMenu, createConditionalMenu, deleteConditionalMenu, batchGetArticle, getArticle, batchGetMaterialList, getMaterial } from './wechatMenu';
declare const aspectDict: {
    mergeUser: typeof mergeUser;
    switchTo: typeof switchTo;
    refreshWechatPublicUserInfo: typeof refreshWechatPublicUserInfo;
    loginByMobile: typeof loginByMobile;
    loginWechat: typeof loginWechat;
    loginWechatMp: typeof loginWechatMp;
    wakeupParasite: typeof wakeupParasite;
    syncUserInfoWechatMp: typeof syncUserInfoWechatMp;
    sendCaptcha: typeof sendCaptcha;
    getApplication: typeof getApplication;
    updateConfig: typeof updateConfig;
    updateApplicationConfig: typeof updateApplicationConfig;
    getWechatMpUserPhoneNumber: typeof getWechatMpUserPhoneNumber;
    logout: typeof logout;
    signatureJsSDK: typeof signatureJsSDK;
    createWechatLogin: typeof createWechatLogin;
    unbindingWechat: typeof unbindingWechat;
    loginByWechat: typeof loginByWechat;
    getInfoByUrl: typeof getInfoByUrl;
    getChangePasswordChannels: typeof getChangePasswordChannels;
    updateUserPassword: typeof updateUserPassword;
    getMpUnlimitWxaCode: typeof getMpUnlimitWxaCode;
    confirmUserEntityGrant: typeof confirmUserEntityGrant;
    uploadWechatMedia: typeof uploadWechatMedia;
    getCurrentMenu: typeof getCurrentMenu;
    getMenu: typeof getMenu;
    createMenu: typeof createMenu;
    createConditionalMenu: typeof createConditionalMenu;
    deleteConditionalMenu: typeof deleteConditionalMenu;
    batchGetArticle: typeof batchGetArticle;
    getArticle: typeof getArticle;
    batchGetMaterialList: typeof batchGetMaterialList;
    getMaterial: typeof getMaterial;
    createSession: typeof createSession;
};
export default aspectDict;
