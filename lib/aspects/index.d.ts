import { loginByMobile, loginWechat, loginWechatMp, syncUserInfoWechatMp, sendCaptcha, switchTo, refreshWechatPublicUserInfo } from './token';
import { getUploadInfo } from './extraFile';
import { getApplication } from './application';
import { updateConfig, updateApplicationConfig } from './config';
import { mergeUser } from './user';
export declare const aspectDict: {
    mergeUser: typeof mergeUser;
    switchTo: typeof switchTo;
    refreshWechatPublicUserInfo: typeof refreshWechatPublicUserInfo;
    loginByMobile: typeof loginByMobile;
    loginWechat: typeof loginWechat;
    loginWechatMp: typeof loginWechatMp;
    syncUserInfoWechatMp: typeof syncUserInfoWechatMp;
    getUploadInfo: typeof getUploadInfo;
    sendCaptcha: typeof sendCaptcha;
    getApplication: typeof getApplication;
    updateConfig: typeof updateConfig;
    updateApplicationConfig: typeof updateApplicationConfig;
};
