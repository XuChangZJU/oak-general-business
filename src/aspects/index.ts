import {
    loginByMobile,
    loginWechat,
    loginWechatMp,
    syncUserInfoWechatMp,
    sendCaptcha,
    switchTo,
    refreshWechatPublicUserInfo,
    getWechatMpUserPhoneNumber,
    logout,
    loginByWechat,
    wakeupParasite,
} from './token';
import { getInfoByUrl } from './extraFile';
import {
    getApplication,
    signatureJsSDK,
    uploadWechatMedia,
} from './application';
import { updateConfig, updateApplicationConfig } from './config';
import { mergeUser, getChangePasswordChannels, updateUserPassword } from './user';
import { createWechatLogin } from './wechatLogin';
import { unbindingWechat } from './wechatUser';
import { getMpUnlimitWxaCode } from './wechatQrCode';
import { confirmUserEntityGrant } from './userEntityGrant';
import { createSession } from './session';
import {
    getCurrentMenu,
    getMenu,
    createMenu,
    createConditionalMenu,
    deleteConditionalMenu,
    batchGetArticle,
    getArticle,
    batchGetMaterialList,
    getMaterial,
} from './wechatMenu'

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
    uploadWechatMedia,
    getCurrentMenu,
    getMenu,
    createMenu,
    createConditionalMenu,
    deleteConditionalMenu,
    batchGetArticle,
    getArticle,
    batchGetMaterialList,
    getMaterial,
    createSession,
};

export default aspectDict;
