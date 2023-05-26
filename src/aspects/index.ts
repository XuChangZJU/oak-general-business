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
} from './token';
import { getUploadInfo } from './extraFile';
import { getApplication, signatureJsSDK } from './application';
import { updateConfig, updateApplicationConfig } from './config';
import { mergeUser } from './user';
import { createWechatLogin } from './wechaLogin';
import { unbindingWechat } from './wechatUser';

const aspectDict = {
    mergeUser,
    switchTo,
    refreshWechatPublicUserInfo,
    loginByMobile,
    loginWechat,
    loginWechatMp,
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
};

export default aspectDict;