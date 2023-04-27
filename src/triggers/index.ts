import addressTriggers from './address';
import userTriggers from './user';
import userEntityGrantTriggers from './userEntityGrant';
import wechatQrCodeTriggers from './wechatQrCode';
import messageTriggers from './message';
import notificationTriggers from './notification';
import wechatLoginTriggers from './wechatLogin';

export default [
    ...addressTriggers,
    ...userTriggers,
    ...userEntityGrantTriggers,
    ...wechatQrCodeTriggers,
    ...messageTriggers,
    ...notificationTriggers,
    ...wechatLoginTriggers,
];
