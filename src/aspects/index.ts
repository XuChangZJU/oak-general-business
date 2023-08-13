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
import { getUploadInfo, getInfoByUrl } from './extraFile';
import { getApplication, signatureJsSDK } from './application';
import { updateConfig, updateApplicationConfig } from './config';
import { mergeUser, getChangePasswordChannels } from './user';
import { createWechatLogin } from './wechatLogin';
import { unbindingWechat } from './wechatUser';
import { getMpUnlimitWxaCode } from './wechatQrCode';

const aspectDict = {
    mergeUser,
    switchTo,
    refreshWechatPublicUserInfo,
    loginByMobile,
    loginWechat,
    loginWechatMp,
    wakeupParasite,
    syncUserInfoWechatMp,
    getUploadInfo,
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
    getMpUnlimitWxaCode,
};

export default aspectDict;
