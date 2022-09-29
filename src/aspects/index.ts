import {
    loginByMobile,
    loginWechat,
    loginWechatMp,
    syncUserInfoWechatMp,
    sendCaptcha,
} from './token';
import { getUploadInfo } from './extraFile';
import { getApplication } from './application';
import { updateConfig } from './config';
// import  commonAspectDict from 'oak-common-aspect';

export const aspectDict = {
    loginByMobile,
    loginWechat,
    loginWechatMp,
    syncUserInfoWechatMp,
    getUploadInfo,
    sendCaptcha,
    getApplication,
    updateConfig,
};

// export type AspectDict<ED extends EntityDict & BaseEntityDict> = TokenAD<ED> & CrudAD<ED>;