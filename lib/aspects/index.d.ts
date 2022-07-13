import { loginByMobile, loginMp, loginWechatMp, syncUserInfoWechatMp, sendCaptcha } from './token';
import { getUploadInfo } from './extraFile';
import { getApplication } from './application';
export declare const aspectDict: {
    loginByMobile: typeof loginByMobile;
    loginMp: typeof loginMp;
    loginWechatMp: typeof loginWechatMp;
    syncUserInfoWechatMp: typeof syncUserInfoWechatMp;
    getUploadInfo: typeof getUploadInfo;
    sendCaptcha: typeof sendCaptcha;
    getApplication: typeof getApplication;
};
