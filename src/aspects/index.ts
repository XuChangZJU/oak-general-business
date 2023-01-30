import {
    loginByMobile,
    loginWechat,
    loginWechatMp,
    syncUserInfoWechatMp,
    sendCaptcha,
    switchTo,
} from './token';
import { getUploadInfo } from './extraFile';
import { getApplication } from './application';
import { updateConfig, updateApplicationConfig } from './config';
import { mergeUser } from './user';

export const aspectDict = {
    mergeUser,
    switchTo,
    loginByMobile,
    loginWechat,
    loginWechatMp,
    syncUserInfoWechatMp,
    getUploadInfo,
    sendCaptcha,
    getApplication,
    updateConfig,
    updateApplicationConfig,
};