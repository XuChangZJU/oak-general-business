import { loginByPassword, loginMp, loginWechatMp, syncUserInfoWechatMp } from './token';
import { getUploadInfo } from './extraFile'
export const aspectDict = {
    loginByPassword,
    loginMp,
    loginWechatMp,
    syncUserInfoWechatMp,
    getUploadInfo,
};

// export type AspectDict<ED extends EntityDict & BaseEntityDict> = TokenAD<ED> & CrudAD<ED>;