import { loginByMobile, loginWechat, loginWechatMp, syncUserInfoWechatMp, sendCaptcha } from './token';
import { getUploadInfo } from './extraFile';
import { getApplication } from './application';
import { updateConfig, updateApplicationConfig } from './config';
export declare const aspectDict: {
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
