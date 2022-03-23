import { Aspect } from 'oak-domain/lib/types/Aspect';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/base-domain/EntityDict';
import { EntityDict } from 'oak-domain/lib/types/Entity';
import { loginByPassword, loginMp } from './token';
import { operate, select } from './crud';

const AspectDict = {
    loginByPassword,
    loginMp,
    operate,
    select,
};

export default AspectDict;