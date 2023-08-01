import addressCheckers from './address';
import tokenCheckers from './token';
import userCheckers from './user';
import userEntityGrantCheckers from './userEntityGrant';
import wechatQrCodeCheckers from './wechatQrCode';
import applicationCheckers from './application';
import mobileChecker from './mobile';
import wechatPublicTagChecker from './wechatPublicTag';
import messageChecker from './message';
import messageTypeTemplateId from './messageTypeTemplateId';
import parasite from './parasite';

const checkers = [
    ...mobileChecker,
    ...addressCheckers,
    ...tokenCheckers,
    ...userCheckers,
    ...userEntityGrantCheckers,
    ...wechatQrCodeCheckers,
    ...applicationCheckers,
    ...wechatPublicTagChecker,
    ...messageChecker,
    ...messageTypeTemplateId,
    ...parasite,
];


export default checkers;