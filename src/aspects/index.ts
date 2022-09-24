import {
    loginByMobile,
    loginWechat,
    loginWechatMp,
    syncUserInfoWechatMp,
    sendCaptcha,
} from './token';
import { getUploadInfo } from './extraFile';
import { getApplication } from './application';
import { getLivestream, getLivestream2, getPlayBackUrl } from './livestream';
// import  commonAspectDict from 'oak-common-aspect';

export const aspectDict = {
    loginByMobile,
    loginWechat,
    loginWechatMp,
    syncUserInfoWechatMp,
    getUploadInfo,
    sendCaptcha,
    getApplication,
    getLivestream,
    getLivestream2,
    getPlayBackUrl,
};

// export type AspectDict<ED extends EntityDict & BaseEntityDict> = TokenAD<ED> & CrudAD<ED>;