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
import parasiteTriggers from './parasite';
import extraFileTriggers from './extraFile';
import sessionMessageTriggers from './sessionMessage';
import wechatMenuTriggers from './wechatMenu';
import wechatPublicTag from './wechatPublicTag';
import accountTriggers from './account';
export default [
    ...accountTriggers,
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
    ...parasiteTriggers,
    ...extraFileTriggers,
    ...sessionMessageTriggers,
    ...wechatMenuTriggers,
    ...wechatPublicTag,
];
