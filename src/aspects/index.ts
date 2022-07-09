import { loginByMobile, loginMp, loginWechatMp, syncUserInfoWechatMp, sendCaptcha } from './token';
import { getUploadInfo } from './extraFile';
// import  commonAspectDict from 'oak-common-aspect';
import { assign } from 'lodash';
export const aspectDict = assign({
    loginByMobile,
    loginMp,
    loginWechatMp,
    syncUserInfoWechatMp,
    getUploadInfo,
    sendCaptcha,
}/* , commonAspectDict */);

// export type AspectDict<ED extends EntityDict & BaseEntityDict> = TokenAD<ED> & CrudAD<ED>;