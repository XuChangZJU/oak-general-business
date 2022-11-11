import addressCheckers from './address';
import tokenCheckers from './token';
import userCheckers from './user';
import userEntityGrantCheckers from './userEntityGrant';
import wechatQrCodeCheckers from './wechatQrCode';
import applicationCheckers from './application';

import { processCheckers } from '../utils/check';

const checkers = [
    ...addressCheckers,
    ...tokenCheckers,
    ...userCheckers,
    ...userEntityGrantCheckers,
    ...wechatQrCodeCheckers,
    ...applicationCheckers,
];

processCheckers(checkers as any);

export default checkers;