import { loginByMobile, loginWechat, loginWechatMp, syncUserInfoWechatMp, sendCaptcha, switchTo, refreshWechatPublicUserInfo, getWechatMpUserPhoneNumber, logout, loginByWechat, wakeupParasite, } from './token';
import { getInfoByUrl } from './extraFile';
import { getApplication, signatureJsSDK, uploadWechatMedia, batchGetArticle, getArticle, batchGetMaterialList, getMaterial, } from './application';
import { updateConfig, updateApplicationConfig } from './config';
import { updateStyle } from './style2';
import { syncMessageTemplate } from './template';
import { mergeUser, getChangePasswordChannels, updateUserPassword } from './user';
import { createWechatLogin } from './wechatLogin';
import { unbindingWechat } from './wechatUser';
import { getMpUnlimitWxaCode } from './wechatQrCode';
import { confirmUserEntityGrant } from './userEntityGrant';
import { createSession } from './session';
import { getCurrentMenu, getMenu, createMenu, createConditionalMenu, deleteConditionalMenu, deleteMenu, } from './wechatMenu';
import { createTag, getTags, editTag, deleteTag, syncTag, oneKeySync, } from './wechatPublicTag';
import { getTagUsers, batchtagging, batchuntagging, getUserTags, getUsers, tagging, syncToLocale, syncToWechat, } from './userWechatPublicTag';
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
    updateStyle,
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
    uploadWechatMedia,
    getCurrentMenu,
    getMenu,
    createMenu,
    createConditionalMenu,
    deleteConditionalMenu,
    deleteMenu,
    batchGetArticle,
    getArticle,
    batchGetMaterialList,
    getMaterial,
    createSession,
    createTag,
    getTags,
    editTag,
    deleteTag,
    syncMessageTemplate,
    syncTag,
    oneKeySync,
    getTagUsers,
    batchtagging,
    batchuntagging,
    getUserTags,
    getUsers,
    tagging,
    syncToLocale,
    syncToWechat,
};
export default aspectDict;
