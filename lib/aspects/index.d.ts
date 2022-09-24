import { loginByMobile, loginWechat, loginWechatMp, syncUserInfoWechatMp, sendCaptcha } from './token';
import { getUploadInfo } from './extraFile';
import { getLivestream, getLivestream2, getPlayBackUrl } from './livestream';
export declare const aspectDict: {
    loginByMobile: typeof loginByMobile;
    loginWechat: typeof loginWechat;
    loginWechatMp: typeof loginWechatMp;
    syncUserInfoWechatMp: typeof syncUserInfoWechatMp;
    getUploadInfo: typeof getUploadInfo;
    sendCaptcha: typeof sendCaptcha;
    getApplication: typeof import("./application.dev").getApplication | typeof import("./application.prod").getApplication;
    getLivestream: typeof getLivestream;
    getLivestream2: typeof getLivestream2;
    getPlayBackUrl: typeof getPlayBackUrl;
};
