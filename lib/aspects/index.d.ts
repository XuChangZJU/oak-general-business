import { loginByPassword, loginMp } from './token';
import { operate, select } from './crud';
declare const aspectDict: {
    loginByPassword: typeof loginByPassword;
    loginMp: typeof loginMp;
    operate: typeof operate;
    select: typeof select;
};
export default aspectDict;
