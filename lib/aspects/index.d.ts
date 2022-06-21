import { loginByPassword, loginMp, loginWechatMp, syncUserInfoWechatMp } from './token';
import { getUploadInfo } from './extraFile';
export declare const aspectDict: {
    loginByPassword: typeof loginByPassword;
    loginMp: typeof loginMp;
    loginWechatMp: typeof loginWechatMp;
    syncUserInfoWechatMp: typeof syncUserInfoWechatMp;
    getUploadInfo: typeof getUploadInfo;
} & {
    operate: typeof import("oak-common-aspect/src/crud").operate;
    select: typeof import("oak-common-aspect/src/crud").select;
    amap: typeof import("oak-common-aspect/src/amap").amap;
    getTranslations: typeof import("oak-common-aspect/src/locales").getTranslations;
};
