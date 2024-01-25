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
    refreshToken,
} from './token';
import { getInfoByUrl } from './extraFile';
import {
    getApplication,
    signatureJsSDK,
    uploadWechatMedia,
    batchGetArticle,
    getArticle,
    batchGetMaterialList,
    getMaterial,
    deleteMaterial,
} from './application';
import { updateConfig, updateApplicationConfig, updateStyle } from './config';
import { syncMessageTemplate, getMessageType } from './template';
import { syncSmsTemplate } from './sms';
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
    deleteMenu,
} from './wechatMenu';
import {
    createTag,
    getTags,
    editTag,
    deleteTag,
    syncTag,
    oneKeySync,
} from './wechatPublicTag';
import {
    getTagUsers,
    batchtagging,
    batchuntagging,
    getUserTags,
    getUsers,
    tagging,
    syncToLocale,
    syncToWechat,
} from './userWechatPublicTag';
import {
    wechatMpJump,
} from './wechatMpJump';

const aspectDict = {
    mergeUser,
    switchTo,
    refreshWechatPublicUserInfo,
    loginByMobile,
    loginWechat,
    loginWechatMp,
    wakeupParasite,
    refreshToken,
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
    createSession,
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
    deleteMaterial,
    createTag,
    getTags,
    editTag,
    deleteTag,
    syncMessageTemplate,
    getMessageType,
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
    wechatMpJump,
    syncSmsTemplate
};

export default aspectDict;
