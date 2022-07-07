import addressCheckers from './address';
import tokenCheckers from './token';
import userCheckers from './user';
import userEntityGrantCheckers from './userEntityGrant';
import wechatQrCodeCheckers from './wechatQrCode';

import { processCheckers } from '../utils/check';

const checkers = [
    ...addressCheckers,
    ...tokenCheckers,
    ...userCheckers,
    ...userEntityGrantCheckers,
    ...wechatQrCodeCheckers,
];

processCheckers(checkers as any);

export default checkers;