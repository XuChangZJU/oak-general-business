import addressTriggers from './address';
import userTriggers from './user';
import userEntityGrantTriggers from './userEntityGrant';
import wechatQrCodeTriggers from './wechatQrCode';

export default [...addressTriggers, ...userTriggers, ...userEntityGrantTriggers, ...wechatQrCodeTriggers];
