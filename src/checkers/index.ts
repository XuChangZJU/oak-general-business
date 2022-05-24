import addressCheckers from './address';
import tokenCheckers from './token';
import userCheckers from './user';
import userEntityGrantCheckers from './userEntityGrant';
import wechatQrCodeCheckers from './wechatQrCode';

export default [
    ...addressCheckers,
    ...tokenCheckers,
    ...userCheckers,
    ...userEntityGrantCheckers,
    ...wechatQrCodeCheckers,
];