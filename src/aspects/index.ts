import { loginByPassword, loginMp, loginWechatMp, syncUserInfoWechatMp } from './token';
import { getUploadInfo } from './extraFile';
import  commonAspectDict from 'oak-common-aspect';
import { assign } from 'lodash';
export const aspectDict = assign({
    loginByPassword,
    loginMp,
    loginWechatMp,
    syncUserInfoWechatMp,
    getUploadInfo,
}, commonAspectDict);

// export type AspectDict<ED extends EntityDict & BaseEntityDict> = TokenAD<ED> & CrudAD<ED>;