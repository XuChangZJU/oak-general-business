import addressCheckers from './address';
import tokenCheckers from './token';
import userCheckers from './user';
import userEntityGrantCheckers from './userEntityGrant';
import wechatQrCodeCheckers from './wechatQrCode';
import applicationCheckers from './application';
import mobileChecker from './mobile';
import wechatPublicTagChecker from './wechatPublicTag';

const checkers = [
    ...mobileChecker,
    ...addressCheckers,
    ...tokenCheckers,
    ...userCheckers,
    ...userEntityGrantCheckers,
    ...wechatQrCodeCheckers,
    ...applicationCheckers,
    ...wechatPublicTagChecker,
];


export default checkers;