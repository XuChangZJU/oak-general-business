import { EntityDict } from 'oak-domain/lib/types';
import { EntityDict as BaseEntityDict } from 'oak-app-domain/EntityDict';
import { loginByPassword, loginMp, loginWechatMp } from './token';

export const aspectDict = {
    loginByPassword,
    loginMp,
    loginWechatMp,
};

// export type AspectDict<ED extends EntityDict & BaseEntityDict> = TokenAD<ED> & CrudAD<ED>;