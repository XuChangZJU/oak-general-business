import { EntityDict } from 'oak-domain/lib/types';
import { EntityDict as BaseEntityDict } from '../base-ed/EntityDict';
import { loginByPassword, loginMp, /* AspectDict as TokenAD  */} from './token';

const aspectDict = {
    loginByPassword,
    loginMp,
};

export default aspectDict;

// export type AspectDict<ED extends EntityDict & BaseEntityDict> = TokenAD<ED> & CrudAD<ED>;