import { loginByMobile, loginWechat, loginWechatMp, syncUserInfoWechatMp, sendCaptcha, switchTo, refreshWechatPublicUserInfo, getWechatMpUserPhoneNumber, logout, loginByWechat, wakeupParasite, } from './token';
import { getInfoByUrl } from './extraFile';
import { getApplication, signatureJsSDK } from './application';
import { updateConfig, updateApplicationConfig } from './config';
import { mergeUser, getChangePasswordChannels, updateUserPassword } from './user';
import { createWechatLogin } from './wechatLogin';
import { unbindingWechat } from './wechatUser';
import { getMpUnlimitWxaCode } from './wechatQrCode';
import { confirmUserEntityGrant } from './userEntityGrant';
import { getCurrentMenu, getMenu, createMenu, createConditionalMenu, deleteConditionalMenu, batchGetArticle, getArticle, createMaterial, batchGetMaterialList, getMaterial, } from './wechatMenu';
const aspectDict = {
    mergeUser,
    switchTo,
    refreshWechatPublicUserInfo,
    loginByMobile,
    loginWechat,
    loginWechatMp,
    wakeupParasite,
    syncUserInfoWechatMp,
    sendCaptcha,
    getApplication,
    updateConfig,
    updateApplicationConfig,
    getWechatMpUserPhoneNumber,
    logout,
    signatureJsSDK,
    createWechatLogin,
    unbindingWechat,
    loginByWechat,
    getInfoByUrl,
    getChangePasswordChannels,
    updateUserPassword,
    getMpUnlimitWxaCode,
    confirmUserEntityGrant,
    getCurrentMenu,
    getMenu,
    createMenu,
    createConditionalMenu,
    deleteConditionalMenu,
    batchGetArticle,
    getArticle,
    createMaterial,
    batchGetMaterialList,
    getMaterial,
};
export default aspectDict;
