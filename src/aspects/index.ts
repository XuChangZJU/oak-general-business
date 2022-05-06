import { loginByPassword, loginMp, loginWechatMp, syncUserInfoWechatMp } from './token';

export const aspectDict = {
    loginByPassword,
    loginMp,
    loginWechatMp,
    syncUserInfoWechatMp,
};

// export type AspectDict<ED extends EntityDict & BaseEntityDict> = TokenAD<ED> & CrudAD<ED>;