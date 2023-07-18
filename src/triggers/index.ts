import addressTriggers from './address';
import userTriggers from './user';
import userEntityGrantTriggers from './userEntityGrant';
import wechatQrCodeTriggers from './wechatQrCode';
import messageTriggers from './message';
import notificationTriggers from './notification';
import wechatLoginTriggers from './wechatLogin';
import applicationTriggers from './application';
import articleMenuTriggers from './articleMenu';
import article from './article';

export default [
    ...applicationTriggers,
    ...addressTriggers,
    ...userTriggers,
    ...userEntityGrantTriggers,
    ...wechatQrCodeTriggers,
    ...messageTriggers,
    ...notificationTriggers,
    ...wechatLoginTriggers,
    ...articleMenuTriggers,
    ...article,
];
