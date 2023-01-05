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

export const aspectDict = {
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