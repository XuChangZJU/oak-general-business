import { loginByPassword, loginMp } from './token';
import { operate, select } from './crud';

const aspectDict = {
    loginByPassword,
    loginMp,
    operate,
    select,
};


export default aspectDict;